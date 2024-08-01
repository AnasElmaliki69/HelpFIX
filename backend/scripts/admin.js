const User = require("../models/userModel");
const bcrypt = require("bcrypt");


async function createAdminAccount() {
    try {
        const existingAdimn = await User.findOne({email: "admin@test.com"})
        if (!existingAdimn) {
            const newAdmin = new User({
                name: "Admin",
                U_name: "admin",
                firstName: "admin",
                lastName: "admin",
                email: "admin@test.com",
                password: await bcrypt.hash("admin",10),
                RoleType: "admin",
                address: {
                    street: "x",
                    city: "x",
                    state: "x",
                    zip: "x",
                    country: "x"
                },
                number: "0606060606"
            })
            await newAdmin.save();
            console.log("admine acount created succesflully")
        } else {
            console.log("admin already exist");
        }
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = createAdminAccount;