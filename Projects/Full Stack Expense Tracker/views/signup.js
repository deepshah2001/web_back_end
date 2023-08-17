let signUp = document.getElementById("signup");
let form = document.getElementById("form");

signUp.addEventListener("click", addUser);

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
        document.getElementById('status').innerHTML = "";
        console.log(response);
      })
      .catch((err) => {
        document.getElementById('status').innerHTML = "User Already Exists!";
        console.log(err);
      });

    form.reset();
  }
}
