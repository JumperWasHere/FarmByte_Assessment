


const User = require('../model/user')
const { Categories, Clinic } = require('../model/Categories')
// const clinic = require('../model/Clinics')
const { success, error, validation } = require('../utils/responseApi');
const requiredKeys = ["firstname", "lastName", "emailAddress","password"];

const getAllUsers = async (req, res, next) => {
    let categories;
    let categoriesWithClinics = [];
    let users = [];
    try {
        // db.collection.aggregate( <pipeline>, <options> )

        //  categories = await Categories.aggregate([
        //      {
        //         $lookup: {
        //             from: 'clinics', // Collection name of clinics
        //             localField: '_id', // Join field in categories (category id)
        //             foreignField: 'category', // Join field in clinics (category id)
        //              as: 'clinics', // Output array field name, this case use same array clinics
        //         },
        //     },
        //      {
        //         $match: { clinics: { $exists: true, $ne: [] } }, // Filter categories with at least one clinic
        //     },
        // ]);




        // const categoryCursor = await Categories.find().lean().cursor();

        // // Initialize an empty array to store results
        // // const categoriesWithClinics = [];
        // // Iterate through each category
        // for await (const category of categoryCursor) {
        //     console.log('category', category);
        //     // Check if the category has any related clinics
        //     const hasClinics = await Clinic.exists({ category: category._id });
        //     console.log('hasClinics', hasClinics);

        //     // If clinics exist, add the category to the results
        //     if (hasClinics) {
        //         categoriesWithClinics.push(category);
        //     }
        // }
        //tce
        // const distinctClinicCategories = await Clinic.distinct('category')
        // console.log('distinctClinicCategories', distinctClinicCategories);

        // if (distinctClinicCategories.length < 0) return []

        // categories = await Categories
        //     .find({ _id: { $in: distinctClinicCategories } })
        //     .lean()

        users = await User.find();
    } catch (err) {
        return next(err);
    }
    if (!users) {

        return res.status(500).json(error("internal server error", res.statusCode));

    }

    return res.status(200).json(success("Success get users", { data: users }, res.statusCode));

}
const addData = async (req, res, next) =>{
    let users;
    try {
        const cat1 = await Categories.create({ label: "ENT" });
        const cat2 = await Categories.create({ label:"24-Hours"});
        const cat3 = await Categories.create({ label: "24-Hours" });

        const clinic1 = await Clinic.create({ label: "Klinik A", category: cat1._id });
        const clinic2 = await Clinic.create({ label: "Klinik B", category:cat3._id });

        cat1.clinics.push(clinic1._id);
        cat3.clinics.push(clinic2._id);
        await cat1.save()
        await cat2.save()
        await cat3.save()
        // await clinic1.save()
        // await clinic2.save()



        // users = await Clinic.find({}).populate('Categories');
    } catch (err) {
        return next(err);
    }
    // if (!users) {

    //     return res.status(500).json(error("internal server error", res.statusCode));

    // }

    return res.status(200).json(success("Success create cat and clinic", { data: null }, res.statusCode));
}
const addUser = async (req, res, next) => {
    console.log(req.body);
    const { firstname, lastName, emailAddress, password, homeAddress, roleId, title } = req.body;
    const missingKeys = validateRequiredKeys(req.body, requiredKeys);

    if (missingKeys.length > 0) {
        return res.status(422).json(validation({ key: missingKeys+ " is required" }));
    }

    let user;
    try {
        var query = { emailAddress: emailAddress };
        let value = await User.findOne(query);
        if (value !== null){

            console.log('exist email');
        }

        user = new User({
            firstname, lastName, emailAddress, password, homeAddress, roleId, title
        })
        // user = await user.save();

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
        if (!jsonObj.hasOwnProperty(key) || jsonObj[key].trim() == "" ) {
            missingKeys.push(key);
        }
    });

    return missingKeys;
}
module.exports = {
    addUser, getAllUsers, updateUser, deleteUser, addData
}