const mongoose = require('mongoose');

const Schema = mongoose.Schema

const prestationSchema = new Schema({
    ville: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    }
}, {timestamps: true });

module.exports = mongoose.model('Prestation', prestationSchema);
