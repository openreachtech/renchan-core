import {
  ModelAttributeFactory,
  RenchanModel,
} from '@openreachtech/renchan-sequelize'

export default class Admin extends RenchanModel {
  /** @override */
  static createAttributes (DataTypes) {
    const factory = ModelAttributeFactory.create(DataTypes)

    return {
      ...factory.ID_BIGINT,
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(191),
      },
      phoneNumber: {
        type: DataTypes.STRING(31),
      },
    }
  }
}
