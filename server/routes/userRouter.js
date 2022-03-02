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
router.post("/user/login", async (req, res) => {

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
router.patch("/user/me", auth, async (req, res) => {
    // Set params for whats allowed to change
    console.log("REQ =>", req.user);
    const allowedField = ["name", "password", "email"]
    const reqChange = Object.keys(req.body)
    const isAllowed = reqChange.every(field => allowedField.includes(field))

    if (!isAllowed) return res.status(400).send("Not Allowed!")

    try {

        reqChange.forEach(field => {
            req.user[field] = req.body[field]
        })

        await req.user.save()
        res.send(req.user).status(200)

    } catch (error) {
        res.status(500).send(error)
    }
})





// Create user
router.post("/user", async (req, res) => {
    console.log('req', req.body);

    try {
        const user = new User(req.body)
        const token = await user.generateToken()

        await user.save()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router