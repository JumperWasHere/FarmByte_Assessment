const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicSchame = new Schema({
    label: String,
    category: { type: Schema.Types.ObjectId, ref: 'Categories' }

});

const categorieSchame = new Schema({
    label: String,
    // clinics: clinicSchame
    clinics: [{ type: Schema.Types.ObjectId, ref: 'Clinic' }] // reference the Clinic model


});


const Categories = mongoose.model("categories", categorieSchame);
const Clinic = mongoose.model("Clinic", clinicSchame);

// module.exports = mongoose.model("Categories", categorieSchame)

module.exports = { Categories, Clinic }