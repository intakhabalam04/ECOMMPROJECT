const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = require('../configs/auth.config')

exports.signup = async (req, res) => {
    const request_body = req.body

    const user_obj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await user_model.create(user_obj)
        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            createdAt: user_created.createdAt,
            userType: user_created.userType
        }
        res.status(201).send(res_obj)
    } catch (e) {
        console.log('Error while registering the new user ', e)
        res.status(500).send({
            message: 'Some error happened while registering new user ', e
        })
    }
}

exports.login = async (req, res) => {
    const user = await user_model.findOne({userId: req.body.userId})

    if (user == null) {
        return res.status(400).send({
            message: 'Invalid userId! Please enter correct userId'
        })
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    if (!isPasswordValid) {
        return res.status(401).send({
            message: 'Incorrect Password! Please enter correct Password'
        })
    }

    const token = jwt.sign({
        id: user.userId
    }, secret.secret, {
        expiresIn: 600
    })



    return res.status(200).send({
        // message: 'Successfully login'
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    })
}















