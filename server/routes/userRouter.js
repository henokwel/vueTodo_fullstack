const express = require("express")
const User = require("../models/User")
const router = express.Router()


// Remove User
router.delete("/user/:id", async (req, res) => {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.id })
        if (!user) throw new Error()
        res.send(User).status(200)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Read User
router.get("/user", async (req, res) => {
    const user = await User.find({})

    try {

        res.send(user).status(200)

    } catch (error) {

        res.status(500).send("Didn't find any users", error)
    }

})


// Edit user
router.patch("/user/:id", async (req, res) => {
    // Set params for whats allowed to change
    const allowedField = ["title", "done"]
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

        console.log(user);
        await user.save()
        res.send({user, token}).status(201)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router