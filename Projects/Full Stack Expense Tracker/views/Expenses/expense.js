let form = document.getElementById("expense");
let expense = document.getElementById("submit");
let list = document.getElementById("expenses");

expense.addEventListener("click", addExpense);

window.addEventListener("DOMContentLoaded", () => {
  // Taking out the token for that logged in particular user for further storing their details
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/expenses", {
      headers: { Authorization: token }, // Passing the token in the header for verification through jwt
    })
    .then((response) => {
      response.data.expenses.forEach((expense) => {
        showExpenses(expense);
      });
    });
});

function addExpense(e) {
  e.preventDefault();

  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  if (amount === "" || description === "" || category === "") {
    alert("Please fill out all the required fields in the form!");
  } else {
    let myExpense = {
      amount: amount,
      description: description,
      category: category,
    };

    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3000/add-expense", myExpense, {
        headers: { Authorization: token },
      })
      .then((response) => {
        showExpenses(response.data.expense);
        console.log(response);
      })
      .catch((err) => {
        document.body.innerHTML += "Something Went Wrong!";
        console.log(err);
      });

    form.reset();
    leader.setAttribute("hidden", "hidden");
  }
}

function showExpenses(myExp) {
  const tr = document.createElement("tr");

  tr.className = "trans";
  tr.id = "expenses_heading";

  const c2 = document.createElement("td");
  const c3 = document.createElement("td");
  const c4 = document.createElement("td");
  const c5 = document.createElement("td");

  c2.innerText = myExp.amount;
  c3.innerText = myExp.description;
  c4.innerText = myExp.category;

  tr.appendChild(c2);
  tr.appendChild(c3);
  tr.appendChild(c4);

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete";

  deleteBtn.appendChild(document.createTextNode("Delete"));

  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .delete("http://localhost:3000/delete-expense/" + myExp.id, {
        headers: { Authorization: token },
      })
      .then(() => {
        list.removeChild(tr);
      })
      .catch((err) => {
        document.body.innerHTML += "Something Went Wrong!";
        // console.log(err);
      });
    leader.setAttribute("hidden", "hidden");
  });

  c5.appendChild(deleteBtn);
  tr.appendChild(c5);

  list.appendChild(tr);
}
