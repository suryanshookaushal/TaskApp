const mongoose = require('mongoose')
const listschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const List = mongoose.model('List', listschema)

module.exports = List