/**
 * `npm audit`, deliberately letting through the advisories `scripts/stopgap-audit.json`
 * lists, as a stopgap until a release fixes them.
 *
 * Usage: `node scripts/stopgap-audit.js`
 *
 * Exits 1 when
 * - an advisory is reported that the list does not name, at any severity,
 * - an advisory the list names is no longer reported, so the entry has outlived its reason,
 * - npm audit answers with an error instead of a report.
 *
 * `npm audit` resolves the tree from `package-lock.json` alone, so this runs before `npm ci`
 * and uses Node's built-in modules only.
 */

import {
  spawnSync,
} from 'node:child_process'
import {
  readFileSync,
} from 'node:fs'
import {
  basename,
  join,
} from 'node:path'

const IGNORED_ADVISORIES_PATH = join(import.meta.dirname, 'stopgap-audit.json')

const ADVISORY_ID_PATTERN = /(?<id>GHSA(?:-[0-9a-z]{4}){3})$/u

const MAX_AUDIT_OUTPUT_BYTES = 64 * 1024 * 1024

/**
 * Read the advisories the list lets through.
 *
 * @returns {Array<{
 *   id: string,
 *   package: string,
 *   path: string,
 *   reason: string,
 *   removeWhen: string,
 * }>} The ignored advisories.
 */
function readIgnoredAdvisories () {
  const content = readFileSync(IGNORED_ADVISORIES_PATH, 'utf8')

  return JSON.parse(content).advisories
}

/**
 * Run `npm audit --json` and parse its report.
 *
 * @returns {Record<string, *> | null} The report, or null when npm printed none.
 */
function runAudit () {
  // npm exits 1 whenever it finds an advisory, so the status says nothing here.
  const auditResult = spawnSync(
    'npm',
    [
      'audit',
      '--json',
    ],
    {
      encoding: 'utf8',
      maxBuffer: MAX_AUDIT_OUTPUT_BYTES,
    }
  )

  try {
    return JSON.parse(auditResult.stdout)
  } catch {
    process.stderr.write(auditResult.stderr)

    return null
  }
}

/**
 * Collect the advisories a report names, one entry per advisory id.
 *
 * @param {{
 *   report: Record<string, *>,
 * }} params - Parameters.
 * @returns {Map<string, {
 *   name: string,
 *   severity: string,
 *   range: string,
 *   title: string,
 * }>} The advisories, keyed by GHSA id.
 */
function collectAdvisories ({
  report,
}) {
  const advisoryEntries = Object.values(report.vulnerabilities)
    .flatMap(vulnerability => vulnerability.via)
    .filter(via => typeof via === 'object')
    .map(via => [
      via.url.match(ADVISORY_ID_PATTERN)?.groups.id ?? via.url,
      {
        name: via.name,
        severity: via.severity,
        range: via.range,
        title: via.title,
      },
    ])

  return new Map(advisoryEntries)
}

/**
 * Compare the advisories reported against the list, and print the outcome.
 *
 * @returns {number} The number of failures.
 */
function main () {
  const report = runAudit()

  if (
    report === null
    || report.error
    || !report.vulnerabilities
  ) {
    process.stderr.write(`npm audit answered with no report, so nothing was checked: ${JSON.stringify(report?.error ?? null)}\n`)

    return 1
  }

  const ignoredAdvisories = readIgnoredAdvisories()
  const advisories = collectAdvisories({
    report,
  })

  const ignoredIds = new Set(
    ignoredAdvisories.map(ignored => ignored.id)
  )

  const unignoredAdvisories = [...advisories]
    .filter(([id]) => !ignoredIds.has(id))
  const staleIgnores = ignoredAdvisories
    .filter(ignored => !advisories.has(ignored.id))
  const metIgnores = ignoredAdvisories
    .filter(ignored => advisories.has(ignored.id))

  metIgnores.forEach(ignored => {
    process.stdout.write(`ignored (stopgap): ${ignored.id} (${ignored.package}) via ${ignored.path}\n`)
    process.stdout.write(`  reason: ${ignored.reason}\n`)
    process.stdout.write(`  remove when: ${ignored.removeWhen}\n`)
  })

  unignoredAdvisories.forEach(([id, advisory]) => {
    process.stderr.write(`not ignored: ${id} ${advisory.severity} ${advisory.name} ${advisory.range} — ${advisory.title}\n`)
  })

  staleIgnores.forEach(ignored => {
    process.stderr.write(`stale ignore: ${ignored.id} (${ignored.package}) is no longer reported; remove it from ${basename(IGNORED_ADVISORIES_PATH)}\n`)
  })

  const failureCount = unignoredAdvisories.length + staleIgnores.length

  process.stdout.write(`checked ${advisories.size} advisory(ies), ${metIgnores.length} ignored, ${failureCount} failure(s)\n`)

  return failureCount
}

process.exitCode = main() === 0
  ? 0
  : 1
