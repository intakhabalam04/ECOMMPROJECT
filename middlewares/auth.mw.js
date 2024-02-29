const user_model = require('../models/user.model')

const verifySignUpBody = async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: 'Failed ! name was not provided in the body'
            })
        }
        if (!req.body.email) {
            return res.status(400).send({
                message: 'Failed ! email was not provided in the body'
            })
        }
        if (!req.body.userId) {
            return res.status(400).send({
                message: 'Failed ! userId was not provided in the body'
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message : 'Failed ! password was not provided in the body'
            })
        }

        let user = await user_model.findOne({
            userId: req.body.userId
        })

        if (user) {
            return res.status(400).send({
                message: "Failed ! user with the same userId is already present"
            })
        }

        user = await user_model.findOne({
            email: req.body.email
        })

        if (user) {
            return res.status(400).send({
                message: "Failed ! user with the same email is already present"
            })
        }
        next()
    } catch (err) {
        console.log('Error while validating the request object ' + err)
        return res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}

module.exports = {
    verifySignUpBody: verifySignUpBody
}

