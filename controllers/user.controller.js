


const User = require('../model/user')
const { success, error, validation } = require('../utils/responseApi');
const requiredKeys = ["firstname", "lastName", "emailAddress","password"];

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(err);
    }
    if (!users) {

        return res.status(500).json(error("internal server error", res.statusCode));

    }

    return res.status(200).json(success("Success get Users", { data: users }, res.statusCode));

}
const addUser = async (req, res, next) => {
    const { firstname, lastName, emailAddress, password, homeAddress, roleId, title } = req.body;
    const missingKeys = validateRequiredKeys(req.body, requiredKeys);

    if (missingKeys.length > 0) {
        return res.status(422).json(validation({ key: missingKeys+ " is required" }));
    }

    let user;
    try {
        user = new User({
            firstname, lastName, emailAddress, password, homeAddress, roleId, title
        })
        user = await user.save();

    } catch (err) {
        return next(err);
    }

    if (!user) {
        return res.status(500).json(error("Unable to save user", res.statusCode));
    }

    return res.status(201).json(success("Success insert user", { data: user }, res.statusCode));

}
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { firstname, lastName, emailAddress, password, homeAddress, roleId, title } = req.body;
    const missingKeys = validateRequiredKeys(req.body, requiredKeys);
    
    if (missingKeys.length > 0) {
        return res.status(422).json(validation({ key: missingKeys + " is required" }));
    }
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {
            firstname, lastName, emailAddress, password, homeAddress, roleId, title
        })
    } catch (err) {
        return next(err);
    }
    if (!user) {

        return res.status(500).json(error("Unable to save user", res.statusCode));

    }

    return res.status(200).json(success("Success Updated user", { data: user }, res.statusCode));

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
   
        return res.status(500).json(error("Unable to delete user", res.statusCode));

    }
  
    return res.status(200).json(success("Success delete User", { data: user }, res.statusCode));

}
// function validate(firstname, lastName, emailAddress, password,) {
//     if (!firstname && firstname.trim() == "" || !lastName && lastName.trim() == "" || !emailAddress && emailAddress.trim() == "" || !password && password.length < 6) {
//         return false
//     }
//     return true
// }
function validateRequiredKeys(jsonObj, requiredKeys) {
    const missingKeys = [];

    requiredKeys.forEach(key => {
        console.log(jsonObj[key] );
        if (!jsonObj.hasOwnProperty(key) || jsonObj[key].trim() == "" ) {
            missingKeys.push(key);
        }
    });

    return missingKeys;
}
module.exports = {
    addUser, getAllUsers, updateUser, deleteUser
}