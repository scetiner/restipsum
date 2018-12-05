var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IpsumSchema = new Schema({
    token: { type: String, required: true, index: { unique: true } },
    model: { type: String },
    count:{ type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


IpsumSchema.pre('save', function(next) {
    var ipsum = this;
    ipsum.updated_at = new Date();

    // if created_at doesn't exist, add to that field
    if (!ipsum.created_at)
    ipsum.created_at = ipsum.updated_at;
    next();
});

module.exports = mongoose.model('Ipsum', IpsumSchema);