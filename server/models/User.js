
const { hash } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { model } = require("mongoose")
const userSchema = require("../schema/userSchema.js")



userSchema.methods.generateToken = async function () {
    const user = this
    const token = sign({ _id: user._id }, "Zoro")
    
    // add token to user tokens
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}




userSchema.pre("save", async function (next) {
    const user = this
    // crypt user password
    if (user.isModified("password")) {
        user.password = await hash(user.password, 8)
    }
    next()
})




const User = model("User", userSchema)

module.exports = User