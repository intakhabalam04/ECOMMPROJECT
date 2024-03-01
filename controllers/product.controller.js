const product_model = require('../models/product.model')

exports.createNewProduct =async (req,res)=>{
    let product = req.body

    try{
        const product_data = {
            name : product.name,
            description : product.description,
            cost : product.cost,
            category : product.categoryId
        }

        product = await product_model.create(product_data)

        return res.status(201).send({
            message : 'Successfully add new Product to the database ',product
        })

    }catch (e) {
        return res.status(500).send({
            message : 'Something error during product creation ',e
        })
    }
}