const mongoose = require('mongoose');

//define database schema & model for posts
const configSchema = new mongoose.Schema(
    {
        responseType: {
            type: String,
            default: "JSON",
            enum: ["JSON","XML"]
        },
        fullURL: {
            type: Boolean,
            default: true,
        },
        titleAsName: {
            type: Boolean,
            default: false,
        }
    }
);

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        config: configSchema
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;