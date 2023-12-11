// import { model, Schema } from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clinicSchame = new Schema({
    label: String,
    category: { type: Schema.Types.ObjectId, ref: 'Categories' }

});

module.exports = mongoose.model("Clinics", clinicSchame)