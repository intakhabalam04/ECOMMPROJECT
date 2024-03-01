const express = require('express')
const mongoose = require('mongoose');
const server_config = require('./configs/server.config')
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model')
const bcrypt = require('bcryptjs')

const app = express()

app.use(express.json())


mongoose.connect(db_config.DB_URL)
const db = mongoose.connection
db.on('error', () => {
    console.log('error while connecting to the database')
})
db.once('open', () => {
    console.log('Connected to the mongoDB')
    init()
})

async function init() {
    let user = await user_model.findOne({userType: 'ADMIN'})
    try {
        if (user) {
            console.log('Admin is already present')
            return;
        }
    } catch (err) {
        console.log('Error while reading the data ' + err)
    }

    try {
        user = await user_model.create({
            name: 'Admin',
            userId: 'admin',
            email: 'admin@gmail.com',
            userType: 'ADMIN',
            password: bcrypt.hashSync('welcome1', 8)
        })

        console.log('Admin created ', user)
    } catch (e) {
        console.log('Error while create admin', e)
    }

}

require('./routes/auth.route')(app)
require('./routes/category.route')(app)
require('./routes/product.route')(app)

app.listen(server_config.PORT, () => {
    console.log("Server started at port num: " + server_config.PORT)
})