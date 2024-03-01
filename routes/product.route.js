const product_controller = require('../controllers/product.controller')
const product_mw = require('../middlewares/product.mw')

module.exports = (app)=>{
    app.post('/ecomm/api/v1/addproduct',[product_mw.verifyProductBody],product_controller.createNewProduct)
}