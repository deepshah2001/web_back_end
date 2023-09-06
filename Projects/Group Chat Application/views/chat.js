// Elements and variables to be used
const address = "http://localhost:3000";
const token = localStorage.getItem("token");

const newGroupBtn = document.getElementById("create-group-btn");
const modal = document.getElementById("myModal");
const span = document.getElementById("closeBtn");

const groups = document.getElementById("groups");
const chatRoom = document.getElementById("chat-room");
const sendMessage = document.getElementById("send-btn");
const chatGroup = document.getElementById("chat-display");
const listUsers = document.getElementById("list-of-users");
const created = document.getElementById("created");
const listGroupUsers = document.getElementById("users");

let currentUser;
let handler = null;
let currentInterval = null;

// Event Listeners
newGroupBtn.addEventListener("click", groupDetails);

// For clearing previous informations
function clearMessages(listUsers) {
  let labels = listUsers.querySelectorAll("label");
  labels.forEach((label) => {
    label.remove();
  });
  let buttons = listUsers.querySelectorAll("button");
  if (buttons) {
    buttons.forEach((button) => {
      button.remove();
    });
  }
}

function clearChatRoom(chatGroup) {
  let div = chatGroup.querySelectorAll("div");
  div.forEach((div) => {
    div.remove();
  });
}

// Loading list of groups for a particular user
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${address}/group/display-group`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      // console.log(response);
      currentUser = response.data.currentUser;
      console.log(currentUser);
      response.data.groups.forEach((group) => {
        showGroup(group);
      });
    })
    .catch((err) => console.log(err));
});

// For creating new group
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Requesting all the users for adding into a group
function groupDetails(e) {
  e.preventDefault();

  modal.style.display = "block";

  axios
    .get(`${address}/user/all-users`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      // console.log(response);
      clearMessages(listUsers);
      response.data.users.forEach((user) => {
        if (response.data.user != user.id) showUsers(user);
      });
    })
    .catch((err) => console.log(err));
}

// Showing list of users to be added in the group
function showUsers(user) {
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.className = "form-label";
  input.type = "checkbox";
  input.value = user.id;

  label.appendChild(input);
  label.appendChild(document.createTextNode(user.name));

  listUsers.appendChild(label);
}

// Showing list of users in the group
function showGroupUsers(user) {
  const label = document.createElement("label");
  // const input = document.createElement("input");

  label.className = "form-label";
  // input.type = "checkbox";
  // input.value = user.id;

  // label.appendChild(input);
  label.appendChild(document.createTextNode(user.name));

  listGroupUsers.appendChild(label);
}

function displayGroupUsers(user, id) {
  const userId = user.id;
  // console.log(user);

  const label = document.createElement("label");

  label.className = "form-label";
  label.appendChild(document.createTextNode(user.name));
  if (user.role === "admin") {
    const roleOfUser = document.createElement("button");

    roleOfUser.appendChild(document.createTextNode("Admin"));
    roleOfUser.style.display = "inline-block";
    roleOfUser.style.display = "inline-block";
    roleOfUser.style.width = "45%";

    label.appendChild(roleOfUser);
  } else {
    const makeAdmin = document.createElement("button");

    makeAdmin.appendChild(document.createTextNode("Make Admin"));

    makeAdmin.style.display = "inline-block";
    makeAdmin.style.width = "45%";

    makeAdmin.addEventListener("click", () => {
      axios
        .post(
          `${address}/group/make-admin`,
          {
            userId,
            groupId: id,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((response) => alert(response.data.message))
        .catch((err) => console.log(err));
    });

    label.appendChild(makeAdmin);
  }
  const remove = document.createElement("button");

  remove.appendChild(document.createTextNode("Remove"));
  remove.style.width = "45%";
  remove.style.display = "inline-block";
  remove.style.backgroundColor = "red";

  remove.addEventListener("click", () => {
    axios
      .post(
        `${address}/group/delete-user`,
        {
          userId,
          groupId: id,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => alert(response.data.message))
      .catch((err) => console.log(err));
  });
  label.appendChild(remove);

  listGroupUsers.appendChild(label);
  listGroupUsers.style.whiteSpace = "nowrap";
}

// To create new group after submitting the group details
created.addEventListener("click", (e) => {
  e.preventDefault();

  const users = [];

  const groupName = document.getElementById("group-name").value;

  if (!groupName) {
    alert("Please Fill the Group Name!");
  }
  // console.log(groupName);

  const usersSelected = document.getElementsByClassName("form-label");
  // console.log(usersSelected);

  Array.from(usersSelected).forEach((userSelected) => {
    const input = userSelected.querySelector('input[type="checkbox"]');
    if (input.checked) {
      users.push(input.value);
    }
  });
  // console.log(users);
  axios
    .post(
      `${address}/group/new-group`,
      {
        groupName,
        users,
      },
      {
        headers: { Authorization: token },
      }
    )
    .then((response) => {
      // console.log(response);
      modal.style.display = "none";
      showGroup(response.data.newGroup);
    })
    .catch((err) => console.log(err));
});

// Showing all the groups for a user
function showGroup(group) {
  const button = document.createElement("button");
  button.appendChild(document.createTextNode(group.name));

  // Messages to be displayed and send after a group is selected
  button.addEventListener("click", () => {
    chatRoom.style.display = "flex";
    const id = group.id;

    console.log(id);
    axios
      .post(
        `${address}/group/all-users`,
        {
          id,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        console.log("Group's User: ", response.data);
        let admin = [];

        // Finding the admin
        response.data.groupUsers.forEach((groupUser) => {
          if (groupUser.role === "admin") admin.push(groupUser.id);
        });

        clearMessages(listGroupUsers);

        if (admin.indexOf(currentUser) === -1) {
          response.data.groupUsers.forEach((groupUser) => {
            showGroupUsers(groupUser);
          });
        } else {
          response.data.groupUsers.forEach((groupUser) => {
            displayGroupUsers(groupUser, id);
          });
          // Button to add new users to the group
          const newMember = document.createElement("button");
          newMember.appendChild(document.createTextNode("Add Users!"));

          const deleteGroup = document.createElement("button");
          deleteGroup.appendChild(document.createTextNode("Delete Group"));

          deleteGroup.style.backgroundColor = "red";

          deleteGroup.addEventListener('click', () => {
            axios.post(`${address}/group/delete-group`, {
              id
            }, {
              headers: {Authorization: token}
            })
            .then(response => alert(response.data.message))
            .catch(err => console.log(err));
          })

          listGroupUsers.appendChild(newMember);
          listGroupUsers.appendChild(deleteGroup);
          console.log("Admin");
        }
      })
      .catch((err) => console.log(err));
    if (currentInterval) clearInterval(currentInterval);
    // Updating the chat after every n seconds
    const updateChat = () => {
      clearChatRoom(chatGroup);
      let groupId = group.id;

      let groupMessages =
        JSON.parse(localStorage.getItem(`Message${groupId}`)) || [];
      // console.log(groupMessages);
      let lastMessageId = 0;
      if (groupMessages.length) {
        // console.log(groupMessages[0]);
        showMessage(groupMessages[0]);
        const lastMessage = groupMessages[groupMessages.length - 1];
        // console.log("Group Message: ", groupMessages);
        lastMessageId = lastMessage[lastMessage.length - 1].id;
      }
      // console.log(lastMessageId);
      axios
        .post(
          `${address}/message/${lastMessageId}`,
          {
            groupId,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((response) => {
          if (response.data.messages.length) {
            if (groupMessages.length)
              response.data.messages.forEach((message) => {
                groupMessages[0].push(message);
              });
            else groupMessages.push(response.data.messages);
            showMessage(response.data.messages);
          }
          while (groupMessages.length > 10) {
            groupMessages.shift();
          }
          localStorage.setItem(
            `Message${groupId}`,
            JSON.stringify(groupMessages)
          );
          // console.log(response);
        })
        .catch((err) => console.log(err));
    };
    updateChat();
    currentInterval = setInterval(updateChat, 10000);

    if (handler) sendMessage.removeEventListener("click", handler);
    handler = sendMessageHandle(group);
    sendMessage.addEventListener("click", handler);
  });

  groups.appendChild(button);
}

// Adding new message to database and handling it
function sendMessageHandle(group) {
  return function (e) {
    e.preventDefault();
    const messageContent = document.getElementById("chat-input");
    let message = messageContent.value;
    const groupId = group.id;
    // console.log("ID: ", groupId);
    if (!message) {
      alert("Please Write a Message to Send!");
    } else {
      axios
        .post(
          `${address}/message/add-message`,
          {
            message,
            groupId,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((response) => {
          messageContent.value = "";
          // console.log(response);
        })
        .catch((err) => console.log(err));
    }
  };
}

// Showing all the messages for a particular group and handling different users messages
function showMessage(groupMessages) {
  groupMessages.forEach((groupMessage) => {
    if (groupMessage.userId === currentUser) {
      displayMyMessage(groupMessage);
    } else {
      displayOtherMessage(groupMessage);
    }
    // console.log("Function Messages: ", groupMessage);
  });
}

// Displaying the logged in user messages on right side
function displayMyMessage(groupMessage) {
  if (groupMessage) {
    const div = document.createElement("div");
    div.className = "message my-message";

    div.appendChild(document.createTextNode(groupMessage.message));

    chatGroup.appendChild(div);
  }
}

// Displaying the messages of users except the logged in user on left side
function displayOtherMessage(groupMessage) {
  if (groupMessage.userId != currentUser) {
    const div = document.createElement("div");
    div.className = "message other-message";

    div.appendChild(
      document.createTextNode(
        groupMessage.user.name + ": " + groupMessage.message
      )
    );

    chatGroup.appendChild(div);
  }
}
