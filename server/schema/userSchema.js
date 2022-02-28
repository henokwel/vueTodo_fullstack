const { Schema } = require("mongoose")

const validator = require("validator")
const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(e) {
            if (!validator.isEmail(e)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                // required: true
            }
        }
    ]
})






module.exports = userSchema 