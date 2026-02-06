const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

class AuthController {



    static login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // 1️⃣ Validation
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password required"
                });
            }

            // 2️⃣ Check user exists
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // 3️⃣ Password compare
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // 4️⃣ Generate JWT
            const token = jwt.sign(
                { id: user._id, role: user.role },
                "hghdfsjfhjdsfiuekj",
                { expiresIn: "1d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,        // HTTPS required
                sameSite: "none",    // CROSS DOMAIN
                maxAge: 24 * 60 * 60 * 1000
            });


            // 5️⃣ Success response
            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    };

    static register = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // 1️⃣ Validation
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            // 2️⃣ Check user already exists
            const userExist = await UserModel.findOne({ email });
            if (userExist) {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            // 3️⃣ Password hashing
            const hashedPassword = await bcrypt.hash(password, 10);

            // 4️⃣ Save user
            const user = new UserModel({
                name,
                email,
                password: hashedPassword
            });

            await user.save();

            // 5️⃣ Success response
            res.status(201).json({
                message: "Register success",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    };

}
module.exports = AuthController