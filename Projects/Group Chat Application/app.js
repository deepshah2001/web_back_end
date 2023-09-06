const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const cron = require('node-cron');

const { Op } = require("sequelize");

const sequelize = require("./util/database");

const User = require("./models/user");
const Message = require("./models/message");
const Group = require("./models/group");
const GroupMember = require("./models/groupmember");
const ArchivedMessage = require("./models/archivedMessage");

const UserRoutes = require("./routes/user");
const MessageRoutes = require("./routes/message");
const GroupRoutes = require("./routes/groups");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

// require('./routes/message')(io);

app.use(bodyParser.json({ extended: false })); // For passing json as response to frontend
app.use(cors()); // For allowing Cross connection

app.use("/user", UserRoutes);
// app.use("/message", MessageRoutes);
app.use("/group", GroupRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello there!");
});

// io.on('connection', (socket) => {
//   console.log("New Client Added!");

//   socket.on('chatUpdate', async (data) => {
//     const lastMessageId = req.params.lastMessageId;
//     const { groupId } = req.body;
//     console.log(lastMessageId);

//     try {
//         const user = req.user.id;

//         const allMessagesContents = await Group.findByPk(groupId, {
//             include: [{
//                 model: Message,
//                 attributes: ['id', 'message', 'userId'],
//                 where: {id: {[Op.gt]: lastMessageId} },
//                 include: [{
//                     model: User,
//                     attributes: ['name'],
//                 }],
//             }],
//         });

//         let messages = [];

//             if(allMessagesContents) {
//                 messages = allMessagesContents.messages;
//             }

//         // console.log("HERE-------------------------", messages);

//         socket.broadcast.emit
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({ status: false, message: "Unable to displayed!" });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client Disconnected!');
//   })
// })

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", async (data) => {
    const { groupId } = data;
    socket.join(groupId); // Join a specific "room" for the group
  });

  socket.on("newMessage", async (data) => {
    const { message, groupId, currentUser } = data;
    const userId = currentUser; // Assuming you've set this upon socket connection/authentication

    try {
      const newMessage = await Message.create({
        userId: userId,
        message: message,
        groupId: groupId,
      });

      console.log("-----------------", newMessage);

      // Send message to everyone in the room (including sender)
      io.to(groupId).emit("receiveChatUpdate", {
        message: newMessage.message,
        userId: newMessage.userId,
        groupId: newMessage.groupId,
      });
    } catch (err) {
      console.log(err);
      socket.emit("errorUpdate", {
        message: "Unable to Add Message to Database!",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on('connect_error', (error) => {
    console.log('Connection Error: ', error);
});
});

cron.schedule('0 0 * * *', async () => { // Runs at midnight (00:00) every day
  try {
    // Find messages that are 1 day old or older
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const messagesToArchive = await Message.findAll({
      where: {
        message_date: {
          [Op.lte]: oneDayAgo,
        },
      },
    });

    // Move messages to ArchivedChat
    await ArchivedMessage.bulkCreate(messagesToArchive.map((message) => message.toJSON()));

    // Delete messages from Chat
    await Message.destroy({
      where: {
        message_date: {
          [Op.lte]: oneDayAgo,
        },
      },
    });

    console.log('Cron job executed successfully.');
  } catch (error) {
    console.error('Cron job failed:', error);
  }
});

// User to Message relationship is one to many
User.hasMany(Message);
Message.belongsTo(User);

// Group to Message
Group.hasMany(Message);
Message.belongsTo(Group);

// User to Group
User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    server.listen(3000);
  })
  .catch((err) => console.log(err));
