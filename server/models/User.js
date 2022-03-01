
const { hash, compare } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { model } = require("mongoose")
const userSchema = require("../schema/userSchema.js")



userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.tokens
    delete userObj.password
    return userObj

}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) throw new Error("Unable to log in")

    // compare password hash

    const isMatch = await compare(password,user.password)

    if(!isMatch) throw new Error("Unable to log in")

    return user

}

userSchema.methods.generateToken = async function () {
    const user = this
    const token = sign({ _id: user._id }, process.env.JWT_SECRET)
    // add token to user tokens
    user.tokens = user.tokens.concat({ token })
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