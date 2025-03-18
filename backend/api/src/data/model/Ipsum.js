import mongoose, { Schema } from 'mongoose';

const IpsumSchema = new Schema({
    token: { type: String, required: true },
    model: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const IpsumModel = mongoose.model('Ipsum', IpsumSchema);

export default IpsumModel;