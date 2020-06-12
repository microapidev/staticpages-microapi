const mongoose = require('mongoose');
const Joi = require("@hapi/joi")



//define database schema & model for posts
const configSchema = new mongoose.Schema({
    responseType: {
        type: String,
        default: "JSON",
        enum: ["JSON", "XML"]
    },
    fullURL: {
        type: Boolean,
        default: true,
    },
    titleAsName: {
        type: Boolean,
        default: false,
    }
});

const userSchema = new mongoose.Schema({
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
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);


function validateUser(investor) {
    const schema = Joi.object({
        fullName: Joi.string()
            .max(150)
            .required(),
        email: Joi.string()
            .max(150)
            .required()
            .email({
                minDomainSegments: 2
            }),
        password: Joi.string()
            .min(6)
            .max(255)
            .required()
    });

    return schema.validate(investor);
}


exports.User = User;
exports.validateUser = validateUser;