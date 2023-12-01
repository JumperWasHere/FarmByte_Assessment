const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const schema = new Schema({ name: String, age: Number, children: [child] });

const userSchame = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    homeAddress: {
        type: String,
    },
    roleId: {
        type: String,
    },
    title:{
        type: String,
    }
 
})
module.exports = mongoose.model("User", userSchame)