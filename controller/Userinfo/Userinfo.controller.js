const Userinfo = require('../../model/Userinfo.js');

// เพิ่ม try-catch block ในฟังก์ชัน getUser
exports.getUser = async (req, res, next) => {
    try {
        const users = await Userinfo.find();
        return res.json({
            message: 'Get user data successfully!',
            status: true,
            data: users
        });
    } catch (err) {
        console.error('Error getting user data:', err);
        return res.status(500).json({
            message: 'Failed to get user data',
            status: false,
            error: err.message
        });
    }
};

// ดึงข้อมูลผู้ใช้ด้วยไอดี
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id; // รหัส ID ของผู้ใช้ที่ต้องการดึงข้อมูล

        const user = await Userinfo.findById(userId); // ค้นหาผู้ใช้โดยใช้ ID

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'User data retrieved successfully!',
            status: true,
            data: user // ข้อมูลของผู้ใช้ที่ถูกค้นพบ
        });
    } catch (error) {
        console.error('Error fetching user data by ID:', error);
        return res.status(500).json({
            message: ('Failed to retrieve user data: ' + error.message),
            status: false,
        });
    }
};


// ปรับปรุงฟังก์ชัน addUserinfo
exports.addUserinfo = async (req, res, next) => {
    try {
        const userinfoData = req.body;
        const newUserInfo = new Userinfo(userinfoData);

        await newUserInfo.save();

        return res.status(201).json({
            message: 'User information added successfully!',
            status: true,
            data: newUserInfo // แก้ไขชื่อตัวแปรให้เป็น newUserInfo ตามที่สร้างขึ้นใหม่
        });
    } catch (error) {
        console.error('Error adding user information:', error);
        return res.status(500).json({
            message: 'Failed to add user information',
            status: false,
            error: error.message
        });
    }
};


// อัปเดตข้อมูลส่วนตัวของผู้ใช้
exports.updateUserinfo = async (req, res, next) => {
    try {
        const userinfoId = req.params.id; // รหัส ID ของข้อมูลส่วนตัวของผู้ใช้ที่ต้องการอัปเดต
        const userinfoData = req.body; // ข้อมูลใหม่ที่จะใช้ในการอัปเดต

        const updatedUserinfo = await Userinfo.findByIdAndUpdate(userinfoId, userinfoData, { new: true }); // อัปเดตข้อมูลส่วนตัวของผู้ใช้และรับข้อมูลที่ถูกอัปเดตกลับมา

        if (!updatedUserinfo) {
            return res.status(404).json({
                message: 'User information not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'User information updated successfully!',
            status: true,
            data: updatedUserinfo // ข้อมูลผู้ใช้ที่ถูกอัปเดต
        });
    } catch (error) {
        console.error('Error updating user information:', error);
        return res.status(500).json({
            message: ('Failed to update user information: ' + error.message),
            status: false,
        });
    }
};


// ลบข้อมูลส่วนตัวของผู้ใช้
exports.deleteUserinfo = async (req, res, next) => {
    try {
        const userinfoId = req.params.id; // รหัส ID ของข้อมูลส่วนตัวของผู้ใช้ที่ต้องการลบ

        const deletedUserinfo = await Userinfo.findByIdAndDelete(userinfoId); // ลบข้อมูลส่วนตัวของผู้ใช้

        if (!deletedUserinfo) {
            return res.status(404).json({
                message: 'User information not found',
                status: false,
                data: null
            });
        }

        return res.status(200).json({
            message: 'User information deleted successfully!',
            status: true,
            data: deletedUserinfo // ข้อมูลผู้ใช้ที่ถูกลบ
        });
    } catch (error) {
        console.error('Error deleting user information:', error);
        return res.status(500).json({
            message: ('Failed to delete user information: ' + error.message),
            status: false,
        });
    }
};