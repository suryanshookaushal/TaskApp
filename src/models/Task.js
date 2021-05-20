const mongoose = require('mongoose')

const taskschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Task = mongoose.model('Task', taskschema)

module.exports = Task
