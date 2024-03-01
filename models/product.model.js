const mongoose  =  require('mongoose')

const productSchema = new mongoose.Schema({
    //name,description,category , cost

    name : {
        type : String,
        required:true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    cost : {
        type :Number,
        required : true
    },category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category.model'
    }
},{
    timestamps : true,
    versionKey : false
})

module.exports = mongoose.model('Product',productSchema)