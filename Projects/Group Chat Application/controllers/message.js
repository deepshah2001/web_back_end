const { Op } = require("sequelize");

const Message = require('../models/message');

exports.addMessage = async (req, res, next) => {
    const { message } = req.body;
//     console.log(req.user);

    if(message === '') {
        res.status(402).json({ status: false, message: "No Message Passed!" });
    }

    try {
        await Message.create({
            userId: req.user.id,
            message: message,
        });

        res.status(200).json({ status: true, message: "Message Added!" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Unable to Add Message to Database!" });
    }
}

// Display all the messages from the database
exports.showMessages = async (req, res, next) => {
    const lastMessageId = req.params.lastMessageId;
    console.log(lastMessageId);

    try {
        const user = req.user.id;
        const messages = await Message.findAll({
            attributes: ['id', 'message', 'userId'],
            where: {id: {[Op.gt]: lastMessageId} }
        });

        // console.log("Messages: ", messages);
        res.status(200).json({ status: true, messages, user, message: "Displayed Message!" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Unable to displayed!" });
    }
};