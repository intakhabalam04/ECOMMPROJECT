const category_controller = require('../controllers/category.controller')
const auth_mw = require('../middlewares/auth.mw')
const category_mw = require('../middlewares/category.mw')

module.exports = (app) => {
    app.post('/ecomm/api/v1/addcategories', [
        auth_mw.verifyToken,
        auth_mw.isAdmin,
        category_mw.verifyCategoryBody
    ], category_controller.createNewCategory)
    app.get('/ecomm/api/v1/allcategories', category_controller.displayAllCategory)
    app.get('/ecomm/api/v1/category/:name', category_controller.displayCategory)
    app.put('/ecomm/api/v1/updatecategories/:name', [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.updateCategory)
    app.delete('/ecomm/api/v1/deletecategory/:name', [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.deleteCategory)
}