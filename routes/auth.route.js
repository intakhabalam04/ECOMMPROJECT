const auth_controller = require('../controllers/auth.controller')
const authMW = require('../middlewares/auth.mw')


module.exports = (app) => {
    app.post('/ecomm/api/v1/auth/signup', [authMW.verifySignUpBody], auth_controller.signup)
    app.post('/ecomm/api/v1/auth/signin',auth_controller.login)
}