const category_model = require('../models/category.model')

exports.createNewCategory = async (req, res) => {
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }

    try {
        const category = await category_model.create(cat_data)
        res.status(201).send(category)
    } catch (err) {
        res.status(500).send({
            message: 'Error while creating the category ', err
        })
    }
}

exports.displayAllCategory = async (req, res) => {
    try {
        const categories = await category_model.find()
        return res.status(200).send(categories)
    } catch (e) {
        return res.status(500).send({
            message: 'Something error ', e
        })
    }
}

exports.displayCategory = async (req,res)=>{
    try{
        const category = await  category_model.findOne({
            name : req.params.name
        })

        if(!category){
            return res.status(404).send({
                message: 'Category with given name does not exists'
            })
        }
        return res.status(200).send(category)

    }catch (err) {
        res.status(500).send({
            message : 'Something error ',err
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await category_model.findOneAndUpdate(
            { name: req.params.name }, // Find category by name
            {
                name: req.body.name,
                description: req.body.description
            }, // Update with new name and description
            { new: true } // Return the updated document
        );

        if (category) {
            return res.status(200).send({
                message: category
            });
        } else {
            return res.status(404).send({
                message: 'Category not found'
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: 'Something went wrong',
            error: error
        });
    }
};

exports.deleteCategory = async (req,res)=>{
    try{
        const category = await category_model.deleteOne({
            name : req.params.name
        })
        if (category.deletedCount!==0){
            return res.status(200).send({
                message : 'Successfully deleted'
            })
        }else {
            return res.status(404).send({
                message : 'Category not found'
            })
        }
    }catch (e) {
        return res.status(500).send({
            message : 'Something error '+e
        })
    }
}