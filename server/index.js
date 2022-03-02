
const express = require("express");
require('./db/mongoose')
const app = express()
const cors = require("cors")
const taskRouter = require("./routes/taskRouter")
const userRouter = require("./routes/userRouter")
const port = process.env.PORT || 5000;


var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log("Port open in", port);
})