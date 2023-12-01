


const User = require('../model/user')

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(err);
    }
    if (!users) {
        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: 500,
                message: 'internal server error'
            }
        });
    }
    return res.status(500).json({
        success: true,
        data: users,
        error: {
            code: 200,
            message: 'Success fetch data'
        }
    });
}
const addUser = async (req, res, next) => {
    const { firstname, lastName, emailAddress, password, homeAddress, roleId, title } = req.body;
 
    let user;

    if (!validate(req.body)) {
        return res.status(422).json({
            success: false,
            data: null,
            error: {
                code: 422,
                message: 'invalid data'
            }
        });
    }
    try {
        
        user = new User({
            firstname, lastName, emailAddress, password, homeAddress, roleId, title
        })
        user = await user.save();
        console.log('done save');
    } catch (err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: 500,
                message: 'Unable to save user'
            }
        });
    }
    return res.status(201).json({
        success: true,
        data: user,
        error: {
            code: 201,
            message: 'Success insert user'
        }
    });
}
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { firstname, lastName, emailAddress, password, homeAddress, roleId, title } = req.body;

    let user;

    if (!validate(req.body)) {
        return res.status(422).json({
            success: false,
            data: null,
            error: {
                code: 422,
                message: 'invalid data'
            }
        });
    }
    try {
        user = await User.findByIdAndUpdate(id, {
            firstname, lastName, emailAddress, password, homeAddress, roleId, title
        })
    } catch (err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: 500,
                message: 'Unable to save user'
            }
        });
    }
    return res.status(201).json({
        success: true,
        data: user,
        error: {
            code: 201,
            message: 'Success Updated user'
        }
    });
}
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: 500,
                message: 'Unable to delete user'
            }
        });
    }
    return res.status(201).json({
        success: true,
        data: user,
        error: {
            code: 201,
            message: 'Success delete user'
        }
    });
}
function validate(data) {
    if (!data.firstname && data.firstname.trim() == "" && !data.lastName && data.lastName.trim() == "" && !data.emailAddress && data.emailAddress.trim() == "" && !data.password && data.password.length < 6) {
        return false
    }
    return true
}

module.exports = {
    addUser, getAllUsers, updateUser, deleteUser
}