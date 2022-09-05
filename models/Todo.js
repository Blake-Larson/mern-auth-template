const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    project: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Project',
        required: true
    },
    item: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Todo', TodoSchema)