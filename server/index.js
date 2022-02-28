const express = require("express");
require('./db/mongoose')
const app = express()
const taskRouter = require("./routes/taskRouter")
const userRouter = require("./routes/userRouter")
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log("Port open in", port);
})