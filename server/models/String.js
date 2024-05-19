const mongoose = require('mongoose');

const StringSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    locale: {
        type: String,
        default: 'en'  // Default locale is English
    }
});

module.exports = mongoose.model('String', StringSchema);
