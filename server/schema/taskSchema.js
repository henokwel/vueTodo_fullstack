const { Schema } = require("mongoose")

const taskSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})



module.exports = taskSchema 