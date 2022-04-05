const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    count:{
        type: Number,
        default: 1,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId || String,
        ref: "User",
        required: false,
    },
});

module.exports = mongoose.model("Link", LinkSchema);