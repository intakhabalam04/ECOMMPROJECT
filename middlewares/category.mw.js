exports.verifyCategoryBody = (req,res,next)=>{
    const category = req.body ;

    if(!category.name){
        return res.status(400).send({
            message : 'Category name not passed in the body'
        })
    }
    if(!category.description){
        return res.status(400).send({
            message : 'Category description is not passed in the body'
        })
    }
    next()
}