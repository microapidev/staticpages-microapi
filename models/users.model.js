const mongoose = require('mongoose');

//define database schema & model for posts
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;