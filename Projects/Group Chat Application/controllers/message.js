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