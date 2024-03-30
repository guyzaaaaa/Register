const User = require('../../model/User') //สร้างตัวแปร user ดึงมาใซ้งาน
const bcrypt = require('bcrypt'); //ฟังค์ซั่นถอดรหัส
const jwt = require("jsonwebtoken"); //ฟังค์ซั่นสร้างโทเคน
const saltRounds = 10;


//Get User
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.find();
        return res.json({
            message: 'Get user data successfully!',
            status: true,
            data: user
        });
    } 
    catch (err) {
        console.log(err)
        return res.json({
            message: ('Can not get typs data',err.message),
            status: false,
            data: null
        })
    }
}

//Get User By Id
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findOne({ user_id: req.params.id });
        if (!user) {
            return res.json({
                message: 'User not found',
                status: false,
                data: null
            });
        }
        return res.json({
            message: 'Get user by id successfully!',
            status: true,
            data: user
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            message: 'Can not get user by id: ' + err.message,
            status: false,
            data: null
        });
    }
}

//Insert User or Register
exports.InsertUser = async (req, res, next) => {
    const { user_id, user_password, user_email } = req.body;
    try {
        // ตรวจสอบว่า user_id หรือ user_email ซ้ำในฐานข้อมูลหรือไม่
        // const existingUser = await User.findOne({ $or: [{ user_id: user_id }, { user_email: user_email }] });
        // if (existingUser) {
        //     return res.status(400).json({
        //         message: 'User with the same ID or email already exists',
        //         status: false,
        //         data: null
        //     });
        // }
        const hashpassword = await bcrypt.hash(user_password, saltRounds);
        const user = new User({ user_id, user_password: hashpassword, user_email });
        await user.save();
        return res.json({
            message: 'Register successfully!',
            status: true,
            data: user
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'can not save user : ' + err.message,
            status: false,
            data: null
        });
    }
}

//Update User
exports.UpdateUser = async (req, res, next) => {
    const { user_id, user_password, user_email } = req.body;
    try {
        const user = await User.findOne({ user_id });
        if (!user) {
            console.log('888888')
            return res.json({
                message: 'User not found',
                status: false,
                data: null
            });
        }

        if (user_password) {
            const hashpassword = await bcrypt.hash(user_password, saltRounds);
            user.user_password = hashpassword;
        }

        if (user_email) {
            user.user_email = user_email;
        }

        await user.save();

        return res.json({
            message: 'Update successful!',
            status: true,
            data: user
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'Update failed: ' + err.message,
            status: false,
            data: null
        });
    }
}

//Delete User
exports.DeleteUser = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.json({
                message: 'User not found',
                status: false,
                data: null
            });
        }
        await User.deleteOne({ _id: user._id });
        return res.json({
            message: 'Delete successful!',
            status: true,
            data: user
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'Delete failed: ' + err.message,
            status: false,
            data: null
        });
    }
}

//Login User
exports.LoginUser = async (req, res, next) => {
    const { user_email, user_password } = req.body;
    try {
        const user = await User.findOne({ user_email });
        if (!user) {
            return res.json({
                message: 'User not found',
                status: false,
                data: null
            });
        }
        const validPassword = await bcrypt.compare(user_password, user.user_password);
        if (!validPassword) {
            console.log('4444')
            return res.json({
                message: 'Invalid password',
                status: false,
                data: null
            });
        }
        return res.json({
            message: 'Login successful!',
            status: true,
            data: user,

        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'Login failed: ' + err.message,
            status: false,
            data: null
        });
    }
}

exports.getme = async (req, res) => {
    try {
       
        let token = req.headers["token"]
        const secretKey = "loginload"
        const decoded =  jwt.verify(token,secretKey)
        return res.json({
            message: 'This token',
            status: true,
            data: decoded
        });

    } catch (err) {
        console.log(err);
        return res.json({
            message: 'Login failed: ' + err.message,
            status: false,
            data: null
        });
    }
}