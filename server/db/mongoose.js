const {connect} = require("mongoose")
const url =  process.env.MONGODB_URL
// const url =  "mongodb://127.0.1:27017/vue_todo"

connect(url)