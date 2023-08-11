let submitBtn = document.getElementById("submit");
let ul = document.getElementById("lists");
let form = document.getElementById("form");

submitBtn.addEventListener("click", getUserDetails);

const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

function getUserDetails(e) {
  e.preventDefault();

  console.log("Function triggered");

  let myUser = {
    name: userName.value,
    email: email.value,
    phone: phone.value,
  };

  axios
    .post("http://localhost:3000/add-user", myUser)
    .then((response) => {
      console.log(response);
      showUser(response.data.newUserDetail);
    })
    .catch((err) => {
      document.body.innerHTML += "<h6>Something Went Wrong</h6>";
      console.log(err);
    });
}

axios
  .get("http://localhost:3000/get-users")
  .then((response) => {
    console.log(response);
    console.log(response.data.allUsers);
    response.data.allUsers.forEach((user) => {
      showUser(user);
    });
  })
  .catch((err) => {
    document.body.innerHTML += "<h6>Something Went Wrong</h6>";
    console.log(err);
  });

function showUser(myUser) {
  // Creating a new 'li' element
  var li = document.createElement("li");

  // Text node for 'li' element to be displayed below the form
  let text =
    JSON.stringify(myUser.name) +
    " - " +
    JSON.stringify(myUser.email) +
    " - " +
    JSON.stringify(myUser.phone);
  li.appendChild(document.createTextNode(text));

  // Creating delete button
  let deleteBtn = document.createElement("button");

  // Add Text to the delete button
  deleteBtn.append(document.createTextNode("Delete"));

  li.appendChild(deleteBtn);

  // Created Edit Button
  let editBtn = document.createElement("button");

  // Adding text to edit button
  editBtn.append(document.createTextNode("Edit"));

  // Adding edit button to list
  li.appendChild(editBtn);

  // Displaying the new user in list
  ul.appendChild(li);

  form.reset();

  // Delete Button if clicked
  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();

    axios.post("http://localhost:3000/deleteUser/" + myUser.id)
        .then(() => ul.removeChild(li))
        .catch(err => {
            document.body.innerHTML += '<h6>Something Went Wrong!</h6>'
            console.log(err);
        })
  });

  // Edit button if clicked
  editBtn.addEventListener("click", function (e) {
    e.preventDefault();

    editTask(myUser, li);
  });
}
