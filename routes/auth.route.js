
const auth_controller = require('../controllers/auth.controller')

module.exports = (app)=>{
    app.post('/ecomm/api/v1/auth/signup',auth_controller.signup)
}