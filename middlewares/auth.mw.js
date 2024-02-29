const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const auth_config = require('../configs/auth.config')

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
        if (!req.body.password) {
            return res.status(400).send({
                message: 'Failed ! password was not provided in the body'
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

const verifySignInBody = (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: 'UserId is not provided'
        })
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: 'Password is not provided'
        })
    }
    next()
}

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'No token found: Unauthorized!'
        });
    }

    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
            console.error('Error while verifying token:', err)
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }

        try {
            const user = await user_model.findOne({ userId: decoded.id });

            if (!user) {
                return res.status(401).send({
                    message: 'Unauthorized!'
                });
            }
            req.user = user
            next();
        } catch (error) {
            // console.error('Error while querying database:', error);
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        }
    });
};

const isAdmin = (req,res,next)=>{
    const user= req.user

    if(user && user.userType==='ADMIN'){
        next()
    }else {
        return res.status(403).send({
            message : 'Only admin users are allowed to access this point'
        })
    }
}

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin:isAdmin
}

