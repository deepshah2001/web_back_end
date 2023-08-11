const User = require("../models/user");

// Adding new user to the appointment table called user in database
exports.postUsers = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone) {
      throw new Error("Mandatory field missing");
    }
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    const data = await User.create({
      name: name,
      email: email,
      phone: phone,
    });
    // json format data send to front-end to handle
    res.status(201).json({ newUserDetail: data });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// Getting all the users already present in the database User
exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(201).json({ allUsers: users });
};

// Deleting user using the user id (unique) and returning the new database content
exports.deleteUsers = async (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  User.findByPk(userId)
    .then((user) => {
      return user.destroy();
    })
    .then(() => console.log("Deleted"))
    .catch((err) => console.log(err));
  const users = await User.findAll();
  res.status(201).json({ allUsers: users });
};
