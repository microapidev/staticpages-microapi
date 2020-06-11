const Users = require("./../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// const response = require("./../utils/response");
const CustomError = require("./../utils/CustomError");
// const validate = require("./../utils/validate");

/**
 * Controllers for :
 *
 * signup
 */

class UserContoller {

    // user signup
    signUp(req, res) {
        const { fullName, email, password } = req.body;
        // validate user
        if (!fullName || !email || !password) {
            return res.json({
                status: 400,
                message: 'Please fill in the required field'
            })
        }

        // Check user exist 
        Users.findOne({ email }, (err, user) => {
            if (user) return res.json({
                status: 400,
                message: 'User already exist'
            });

            const users = new Users({
                fullName,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salts) => {
                bcrypt.hash(users.password, salts, (err, hash) => {
                    if (err) throw new CustomError('there is an error');
                    users.password = hash;
                    users.save(user => {
                        jwt.sign(
                            { id: users.id },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 }, (err, token) => {
                                if (err) throw new CustomError('there is an error');
                                res.json({
                                    status: 200,
                                    data: {
                                        token,
                                        id: users.id,
                                        fullName: users.fullName,
                                        email: users.email,
                                        password: users.password
                                    }
                                })
                            }
                        )
                    })
                })
            })

        })

    }
}

module.exports = new UserContoller();
