const form = document.getElementById("forgot");

form.addEventListener("click", sendMail);

function sendMail(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (email === "") {
    alert("Please Fill required fields in the form!");
  } else {
    axios
      .post("http://localhost:3000/password/forgotpassword", {
        email: email,
      })
      .then((response) => {
        console.log(response.data.message);
        window.location.href = "./success.html";
      })
      .catch((err) => {
        window.location.href = "./failure.html";
        console.log(err);
      });
  }
}
