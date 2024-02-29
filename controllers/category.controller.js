const category_model = require('../models/category.model')

exports.createNewCategory = async (req,res)=>{
    console.log('HEllo')
    const cat_data ={
        name : req.body.name,
        description : req.body.description
    }

    try {
        const category = await category_model.create(cat_data)
        res.status(201).send(category)
    }catch (err) {
        res.status(500).send({
            message : 'Error while creating the category ',err
        })
    }
}