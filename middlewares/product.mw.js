const verifyProductBody = (req, res, next) => {
    const product = req.body

    if (!product.name) {
        return res.status(400).send({
            message: 'Product name is required'
        })
    }
    if (!product.description) {
        return res.status(400).send({
            message: 'Product description is required'
        })
    }
    if (!product.cost) {
        return res.status(400).send({
            message: 'Product cost is required'
        })
    }
    if (!product.categoryId) {
        return res.status(400).send({
            message: 'Product categoryId is required'
        })
    }
    next()
}

module.exports={
    verifyProductBody : verifyProductBody
}