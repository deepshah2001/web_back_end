// Elements used for signup
let signUp = document.getElementById("signup");
let form1 = document.getElementById("form1");

signUp.addEventListener("click", addUser);

// Elements used for login
let form2 = document.getElementById("form2");
let login = document.getElementById("login");

login.addEventListener("click", existingUser);

// Sign Up for a new user
function addUser(e) {
  e.preventDefault();

  let userName = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (userName === "" || email === "" || password === "") {
    alert("Please out the required fields in the form!");
  } else {
    let myUser = {
      userName: userName,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3000/signup/user", myUser)
      .then((response) => {
        document.getElementById("status1").innerHTML = "";
        console.log(response);
      })
      .catch((err) => {
        document.getElementById("status1").innerHTML = "User Already Exists!";
        console.log(err);
      });

    form1.reset();
  }
}

// Login for a user
function existingUser(e) {
  e.preventDefault();

  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;

  if (email === "" || password === "") {
    alert("Please fill out all the required fields in the form!");
  } else {
    let existingUser = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3000/login/user", existingUser)
      .then((response) => {
        document.getElementById("status2").innerHTML = "";
        alert("User Succesfully Logged in!");
        // Setting the token in local storage for further reference in the application
        localStorage.setItem("token", response.data.token);
        window.location.href = response.data.path;
        console.log(response);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          document.getElementById("status2").innerHTML =
            "User Does not Exist! Please signup to continue";
          console.log(err);
        } else if (err.response.status === 401) {
          document.getElementById("status2").innerHTML = "Wrong Password!";
          console.log(err);
        } else {
          console.log(err);
        }
      });

    form2.reset();
  }
}

// Elements used for forgot password
const forgot = document.getElementById("forgot");

forgot.addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "./forgot.html";
});
