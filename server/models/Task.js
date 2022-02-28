
const { model } = require("mongoose")
const taskSchema = require("../schema/taskSchema")

const Task = model("Task", taskSchema)



module.exports = Task