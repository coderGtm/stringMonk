const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contributors: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            locale: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('Workspace', WorkspaceSchema);
