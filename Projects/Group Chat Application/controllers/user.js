const User = require('../models/user');

exports.addUser = async (req, res, next) => {
    const {name, email, phone, password } = req.user;

    await User.create({
        name: name,
        email: email,
        phone: phone,
        password: password,
    });

    res.send(200).json({message: "Created!"});
}