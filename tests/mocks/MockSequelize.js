import MockSequelizeModel from './MockSequelizeModel.js'

export default class MockSequelize {
  /**
   * Factory method.
   *
   * @returns {import('sequelize')} - Instance of this class as mock.
   */
  static create () {
    return /** @type {import('sequelize')} */ (new this())
  }

  /**
   * Getter: mock of Sequelize.Model.
   *
   * @returns {typeof import('sequelize').Model} - Mock of Sequelize.Model.
   */
  static get Model () {
    return MockSequelizeModel
  }
}
