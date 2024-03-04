const product_controller = require('../controllers/product.controller')
const product_mw = require('../middlewares/product.mw')
const auth_mw = require('../middlewares/auth.mw')

module.exports = (app)=>{
    app.post('/ecomm/api/v1/addproduct',[product_mw.verifyProductBody,auth_mw.verifyToken,auth_mw.isAdmin],product_controller.createNewProduct)
    app.get('/ecomm/api/v1/products/',[auth_mw.verifyToken],product_controller.getAllProducts)
    app.get('/ecomm/api/v1/products/:name',[auth_mw.verifyToken],product_controller.getProductsByName)
    app.put('/ecomm/api/v1/products/:name',[auth_mw.verifyToken,auth_mw.isAdmin],product_controller.updateProductsByName)
    app.delete('/ecomm/api/v1/products/:name',[auth_mw.verifyToken,auth_mw.isAdmin],product_controller.deleteProductByName)
}