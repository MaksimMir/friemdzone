const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nicname: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    events: [{ type: Types.ObjectId, ref: 'Event' }],
    message: [{ type: Types.ObjectId, ref: 'Messages' }],
    gallery: [{ type: Types.ObjectId, ref: 'Gallery' }]
});

module.exports = model('User', schema);