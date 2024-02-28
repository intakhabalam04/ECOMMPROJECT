const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')

exports.signup = async (req,res)=>{
    const request_body = req.body

    const user_obj ={
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        password : bcrypt.hashSync(request_body.password,8)
    }

    try {
        const user_created = await user_model.create(user_obj)
        const res_obj={
            name : user_created.name,
            userId: user_created.userId,
            email : user_created.email,
            createdAt:user_created.createdAt,
            userType:user_created.userType
        }
        res.status(201).send(res_obj)
    }catch (e) {
        console.log('Error while registering the new user ',e)
        res.status(500).send('Some error happened while registering new user ',e)
    }
}