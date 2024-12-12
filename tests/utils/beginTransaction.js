import Customer from '../../app/sequelize/models/Customer.js'

export default autoCallback => async () => Customer.beginTransaction(autoCallback)
