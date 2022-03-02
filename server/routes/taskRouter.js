const express = require("express")
const Task = require("../models/Task")
const router = express.Router()


// Remove Task
router.delete("/task/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndRemove({ _id: req.params.id })
        if (!task) throw new Error()
        res.send(task).status(200)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Read Task
router.get("/task", async (req, res) => {
    const task = await Task.find({})

    try {

        res.send(task).status(200)

    } catch (error) {

        res.status(500).send("Didn't find any tasks", error)
    }

})


// Edit Task
router.patch("/task/:id", async (req, res) => {
    // Set params for whats allowed to change
    const allowedField = ["title", "done"]
    const reqChange = Object.keys(req.body)
    const isAllowed = reqChange.every(field => allowedField.includes(field))

    if (!isAllowed) return res.status(400).send("Not Allowed!")

    try {
        console.log('body', req.body);

        //req.params to get id
        const task = await Task.findOne({ _id: req.params.id })

        if (!task) return res.status(404).send("Task not found")

        reqChange.forEach(field => {
            task[field] = req.body[field]
        })

        await task.save()

        res.send(task).status(200)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Create Task
router.post("/task", async (req, res) => {
    try {
        const task = new Task(req.body)
        console.log(task);
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router