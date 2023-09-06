const Group = require("../models/group");
const GroupMember = require("../models/groupmember");
const User = require("../models/user");

exports.createNewGroup = async (req, res, next) => {
  const admin = req.user.id;
  let groupName = req.body.groupName;
  let users = req.body.users;

  console.log(admin, groupName, users);

  const newGroup = await Group.create({
    name: groupName,
  });

  await newGroup.addUsers(users);
  await newGroup.addUser(admin, { through: { role: "admin" } });

  res.status(200).json({ admin, newGroup, users });
};

exports.displayAllGroups = async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    include: [
      {
        model: Group,
      },
    ],
  });

  console.log(user.groups);

  res.status(200).json({ groups: user.groups, currentUser: req.user.id });
};

exports.displayAllUsers = async (req, res, next) => {
  const { id } = req.body;

  console.log("ID: ", id);
  let groupUsers = [];

  Group.findByPk(id, {
    include: [
      {
        model: User,
        through: {
          model: GroupMember,
          attributes: ["role"],
        },
        attributes: ["id", "name"],
      },
    ],
  })
    .then((group) => {
      if (!group) {
        res.status(404).json({ message: "No Such Group Existed!" });
      }
      if (!group.users) {
        res
          .status(404)
          .json({ message: "No Users Existed in the Particular Group" });
      }
      group.users.forEach((groupUser) => {
        let user = {
          id: groupUser.id,
          name: groupUser.name,
          role: groupUser.groupmember.role,
        };
        groupUsers.push(user);
      });
      res.status(200).json({ groupUsers });
      console.log("-------------------------", groupUsers);
    })
    .catch((err) => console.log(err));
};

exports.addGroupAdmin = async (req, res, next) => {
  const { userId, groupId } = req.body;

  const updatedUser = await GroupMember.update(
    {
      role: "admin",
    },
    {
      where: {
        userId: userId,
        groupId: groupId,
      },
    }
  );
  if (updatedUser)
    res.status(200).json({ updatedUser, message: "User Updated!" });
  else res.status(401).json({ message: "Not Updated!" });
};

exports.deleteUser = async (req, res, next) => {
  const { userId, groupId } = req.body;

  GroupMember.destroy({
    where: {
      userId,
      groupId,
    },
  })
    .then(() => res.status(201).json({ message: "User Removed!" }))
    .catch(() => res.status(404).json({ message: "No user found!" }));
};

exports.deleteGroup = async (req, res, next) => {
  const { id } = req.body;

  await GroupMember.destroy({
    where: { groupId: id },
  });

  await Group.destroy({
    where: {id: id}
  });

  res.status(201).json({ message: "Group Deleted!" });
};
