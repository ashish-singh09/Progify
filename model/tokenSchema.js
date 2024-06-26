const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userId: {
        // type: Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1200 // 20 minutes
    }
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;