const product_model = require('../models/product.model')

exports.createNewProduct = async (req, res) => {
    let product = req.body

    try {
        const product_data = {
            name: product.name, description: product.description, cost: product.cost, category: product.categoryId
        }

        product = await product_model.create(product_data)

        return res.status(201).send({
            message: 'Successfully add new Product to the database ', product
        })

    } catch (e) {
        return res.status(500).send({
            message: 'Something error during product creation ', e
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await product_model.find()
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send({
            message: 'Something error during fetching data from the db ', err
        })
    }
}

exports.getProductsByName = async (req, res) => {
    try {
        const product = await product_model.findOne({
            name: req.params.name
        })
        return res.status(200).send(product)
    } catch (e) {
        res.status(500).send({
            message: 'Something error during fetching data from the db ', e
        })
    }
}

exports.updateProductsByName = async (req, res) => {
    try {
        const body = req.body
        const name = req.params.name

        const product_data = {
            name: body.name, description: body.description, cost: body.cost, category: body.category
        }


        const product = await product_model.findOneAndUpdate({
            name: name
        }, product_data, {
            new: true
        })

        if (!product) {
            return res.status(404).send({
                message: 'Product not found'
            })
        }

        return res.status(200).send({
            message: "Product updated successfully ", product
        })
    } catch (e) {
        return res.status(500).send({
            message: 'Something error during updating data from the db ', e
        })
    }
}

exports.deleteProductByName = async (req, res) => {
    try {
        const name = req.params.name;

        const product = await product_model.findOneAndDelete({ name: name });

        if (!product) {
            return res.status(404).send({
                message: 'Product not found'
            });
        }

        return res.status(200).send({
            message: "Product deleted successfully"
        });
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).send({
            message: 'Something went wrong during deleting the product'
        });
    }
}















