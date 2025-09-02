import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import transporter from "../config/nodeMailer.js";
import User from "../models/userModel.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "missing details" })
    };

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)



        const user = new User({ name, email, password: hashedPassword })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: "Registration successfull" })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and passwrd are required" })
    }

    try {

        const user = await User.findOne({ email });
        if (!user) {
            res.json({ success: false, message: "invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "invalid password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxage: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: "Logged in Successfully" })



    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({ success: true, message: "Logged out" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

export const verifyMailOtp = async (req, res) => {

    try{const userId = req.user;

    if (user.isAccountVerified) {
        res.json({ success: false, message: "already verified" })
    }

    const user = await User.find({ userId })

    const otp = String(Math.floor(100000 + Math.random() * 900000))

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Account verification OTP",
        text: `Your OTP is ${otp}. verify your account using this OTP.`
    }

    await transporter.sendMail(mailOption);

    return res.json({success:true,message:"verification otp sent"})

}   catch(error){
        return res.json({success:false,message:error.message})
    }
}