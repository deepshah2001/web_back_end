const { Op } = require("sequelize");

const Message = require('../models/message');
const Group = require("../models/group");
const User = require("../models/user");

exports.addMessage = async (req, res, next) => {
    const { message, groupId } = req.body;
    console.log("ID: ", groupId);

    if(message === '') {
        res.status(402).json({ status: false, message: "No Message Passed!" });
    }

    try {
        const newMessage = await Message.create({
            userId: req.user.id,
            message: message,
            groupId: groupId
        });

        res.status(200).json({ status: true, message: "Message Added!", newMessage });
    } catch(err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Unable to Add Message to Database!" });
    }
}

// Display all the messages from the database
exports.showMessages = async (req, res, next) => {
    const lastMessageId = req.params.lastMessageId;
    const { groupId } = req.body;
    console.log(lastMessageId);

    try {
        const user = req.user.id;

        const allMessagesContents = await Group.findByPk(groupId, {
            include: [{
                model: Message,
                attributes: ['id', 'message', 'userId'],
                where: {id: {[Op.gt]: lastMessageId} },
                include: [{
                    model: User,
                    attributes: ['name'],
                }],
            }],
        });

        let messages = [];

            if(allMessagesContents) {
                messages = allMessagesContents.messages;
            }

        // console.log("HERE-------------------------", messages);

        res.status(200).json({ status: true, messages, user, message: "Displayed Message!", allMessagesContents, userName: req.user.name });
    } catch(err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Unable to displayed!" });
    }
};