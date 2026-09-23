import {
  Kind,
} from 'graphql'

import BaseGraphqlRequestValidator from '../BaseGraphqlRequestValidator.js'

/**
 * GraphQL request validator to cap the depth of a document.
 *
 * Depth is counted per top-level selection,
 * from the selection itself down to its deepest field.
 *
 * An endpoint declares the cap as `maxDocumentDepth` of its config,
 * and the cap is watched on production alone.
 *
 * @extends {BaseGraphqlRequestValidator}
 */
export default class DocumentTooDeepGraphqlRequestValidator extends BaseGraphqlRequestValidator {
  /**
   * Constructor.
   *
   * @param {{
   *   ErrorCtor: typeof import('../../errors/RenchanGraphqlError.js').default
   *   maxDocumentDepth: number | null
   * }} params - Parameters of this constructor.
   */
  constructor ({
    ErrorCtor,

    maxDocumentDepth,
  }) {
    super({
      ErrorCtor,
    })

    this.maxDocumentDepth = maxDocumentDepth
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof DocumentTooDeepGraphqlRequestValidator ? X : never} T, X
   * @override
   * @param {{
   *   ErrorCtor: typeof import('../../errors/RenchanGraphqlError.js').default
   *   maxDocumentDepth: number | null
   * }} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - Instance of this constructor.
   * @this {T}
   * @public
   */
  static create ({
    ErrorCtor,

    maxDocumentDepth,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        ErrorCtor,

        maxDocumentDepth,
      })
    )
  }

  /**
   * Factory method as async.
   *
   * @template {X extends typeof DocumentTooDeepGraphqlRequestValidator ? X : never} T, X
   * @override
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this factory method.
   * @returns {Promise<InstanceType<T>>} - Instance of this constructor.
   * @this {T}
   * @public
   */
  static async createAsync ({
    engine,
  }) {
    const ErrorCtor = this.resolveErrorCtor({
      engine,
    })

    const maxDocumentDepth = this.extractMaxDocumentDepth({
      config: engine.config,
    })

    return this.create({
      ErrorCtor,

      maxDocumentDepth,
    })
  }

  /** @override */
  static get errorName () {
    return 'DocumentTooDeep'
  }

  /**
   * Check whether this validator applies to an endpoint.
   *
   * A cap is watched on production alone,
   * where the documents arriving are a client's rather than a developer's.
   * It caps nothing unless it is an integer of one or more,
   * so an endpoint declaring none, or one no document can sit under, is left alone.
   *
   * @override
   * @param {{
   *   engine: GraphqlType.ServerEngine
   * }} params - Parameters of this method.
   * @returns {boolean} - true if this validator applies.
   * @public
   */
  static isAcceptable ({
    engine,
  }) {
    if (!engine.env.isProduction()) {
      return false
    }

    const maxDocumentDepth = this.extractMaxDocumentDepth({
      config: engine.config,
    })

    if (maxDocumentDepth === null) {
      return false
    }

    if (!Number.isInteger(maxDocumentDepth)) {
      return false
    }

    return maxDocumentDepth >= 1
  }

  /**
   * Extract the cap an endpoint declares.
   *
   * @param {{
   *   config: GraphqlType.Config
   * }} params - Parameters of this method.
   * @returns {number | null} - Cap of the document depth.
   */
  static extractMaxDocumentDepth ({
    config: {
      maxDocumentDepth = null,
    },
  }) {
    return maxDocumentDepth
  }

  /**
   * get: Constructor.
   *
   * @override
   * @returns {typeof DocumentTooDeepGraphqlRequestValidator} - Constructor.
   */
  get Ctor () {
    return /** @type {*} */ (this.constructor)
  }

  /**
   * Define validation rule.
   *
   * @override
   * @returns {GraphqlType.ValidationRule} - Validation rule.
   * @public
   */
  defineValidationRule () {
    return context => ({
      OperationDefinition: node => {
        this.reportDeepSelections({
          context,
          selections: node.selectionSet.selections,
        })
      },
    })
  }

  /**
   * Report top-level selections deeper than the cap.
   *
   * An endpoint declaring no cap reports nothing.
   *
   * @param {{
   *   context: GraphqlType.ValidationContext
   *   selections: ReadonlyArray<import('graphql').SelectionNode>
   * }} params - Parameters of this method.
   * @returns {void}
   */
  reportDeepSelections ({
    context,
    selections,
  }) {
    selections
      .map(it =>
        this.deepMeasureSelectionDepth({
          context,
          selection: it,
        })
      )
      .filter(it =>
        this.exceedsMaxDocumentDepth({
          depth: it,
        })
      )
      .map(it =>
        this.createError({
          value: {
            depth: it,
            maxDocumentDepth: this.maxDocumentDepth,
          },
        })
      )
      .map(it =>
        it.toGraphQLError()
      )
      .forEach(it => {
        context.reportError(it)
      })
  }

  /**
   * Measure the depth a selection reaches.
   *
   * @param {{
   *   context: GraphqlType.ValidationContext
   *   selection: import('graphql').SelectionNode
   *   visitedFragmentNames?: Array<string>
   * }} params - Parameters of this method.
   * @returns {number} - Depth the selection reaches.
   */
  deepMeasureSelectionDepth ({
    context,
    selection,
    visitedFragmentNames = [],
  }) {
    if (
      this.isVisitedFragmentSpread({
        selection,
        visitedFragmentNames,
      })
    ) {
      return 0
    }

    const selectionSetDepth = selection.kind === Kind.FRAGMENT_SPREAD
      ? this.measureSelectionSetDepth({
        context,
        selectionSet: context.getFragment(selection.name.value)?.selectionSet ?? null,
        visitedFragmentNames: [
          ...visitedFragmentNames,
          selection.name.value,
        ],
      })
      : this.measureSelectionSetDepth({
        context,
        selectionSet: selection.selectionSet ?? null,
        visitedFragmentNames,
      })

    if (selection.kind !== Kind.FIELD) {
      return selectionSetDepth
    }

    return selectionSetDepth + 1
  }

  /**
   * Check whether a selection spreads a fragment already on the path.
   *
   * A fragment already on the path contributes nothing,
   * which is what stops a cyclic document from being walked forever.
   *
   * @param {{
   *   selection: import('graphql').SelectionNode
   *   visitedFragmentNames: Array<string>
   * }} params - Parameters of this method.
   * @returns {boolean} - true if the fragment is already on the path.
   */
  isVisitedFragmentSpread ({
    selection,
    visitedFragmentNames,
  }) {
    if (selection.kind !== Kind.FRAGMENT_SPREAD) {
      return false
    }

    return visitedFragmentNames.includes(selection.name.value)
  }

  /**
   * Measure the depth a selection set reaches.
   *
   * @param {{
   *   context: GraphqlType.ValidationContext
   *   selectionSet: import('graphql').SelectionSetNode | null
   *   visitedFragmentNames: Array<string>
   * }} params - Parameters of this method.
   * @returns {number} - Depth the selection set reaches.
   */
  measureSelectionSetDepth ({
    context,
    selectionSet,
    visitedFragmentNames,
  }) {
    const depths = (selectionSet?.selections ?? [])
      .map(selection =>
        this.deepMeasureSelectionDepth({
          context,
          selection,
          visitedFragmentNames,
        })
      )

    return Math.max(
      0,
      ...depths
    )
  }

  /**
   * Check whether a depth exceeds the cap.
   *
   * An endpoint declaring no cap is exceeded by nothing.
   *
   * @param {{
   *   depth: number
   * }} params - Parameters of this method.
   * @returns {boolean} - true if the depth exceeds the cap.
   */
  exceedsMaxDocumentDepth ({
    depth,
  }) {
    if (!this.maxDocumentDepth) {
      return false
    }

    return depth > this.maxDocumentDepth
  }
}
