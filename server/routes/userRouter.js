const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const router = express.Router()



// Logout User
router.get("/user/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token)
        await req.user.save()

        res.send().status(200)

    } catch (error) {
        res.status(500).send(error)
    }
})


// Login User
router.post("/login", async (req, res) => {

    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateToken()

    try {
        if (!user) throw new Error()
        res.send({ user, token }).status(200)
    } catch (error) {
        res.status(503).send(error)
    }
})


// Read me
router.get("/user/me", auth, async (req, res) => {
    console.log('Run', req.user);

    res.send(req.user).status(200)

})


// Remove User
// Not auth converted yet
router.delete("/user/me", auth, async (req, res) => {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.id })
        if (!user) throw new Error()
        res.send(User).status(200)
    } catch (error) {
        res.status(500).send(error)
    }
})



// Edit user
// Not auth converted yet
router.patch("/user/:id", auth, async (req, res) => {
    // Set params for whats allowed to change
    const allowedField = ["name", "password", "email"]
    const reqChange = Object.keys(req.body)
    const isAllowed = reqChange.every(field => allowedField.includes(field))

    if (!isAllowed) return res.status(400).send("Not Allowed!")

    try {
        console.log('body', req.body);

        //req.params to get id
        const user = await User.findOne({ _id: req.params.id })

        if (!user) return res.status(404).send("user not found")

        reqChange.forEach(field => {
            user[field] = req.body[field]
        })

        await user.save()
        res.send(user).status(200)

    } catch (error) {
        res.status(500).send(error)
    }
})



// Create user
router.post("/user", async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.generateToken()

        await user.save()
        res.send({ user, token }).status(201)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router