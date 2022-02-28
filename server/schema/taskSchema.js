const {Schema} = require("mongoose")

const taskSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    done:{
        type:Boolean,
        default:false,
    }
})



module.exports = taskSchema 