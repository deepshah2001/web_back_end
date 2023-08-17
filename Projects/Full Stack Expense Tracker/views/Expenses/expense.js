let form = document.getElementById("expense");
let expense = document.getElementById("submit");
let list = document.getElementById("expenses");

expense.addEventListener("click", addExpense);

window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/expenses").then((response) => {
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

    axios
      .post("http://localhost:3000/add-expense", myExpense)
      .then((response) => {
        showExpenses(response.data.expense);
        console.log(response);
      })
      .catch((err) => {
        document.body.innerHTML += "Something Went Wrong!";
        console.log(err);
      });

    form.reset();
  }
}

function showExpenses(myExp) {
  const li = document.createElement("li");

  const text =
    "Spend " +
    myExp.amount +
    " on " +
    myExp.description +
    " - " +
    myExp.category;

  if (myExp.amount >= 0) li.className = "inc";
  else li.className = "exp";
  li.appendChild(document.createTextNode(text));

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete";

  deleteBtn.appendChild(document.createTextNode("Delete"));

  deleteBtn.addEventListener("click", () => {
    axios
      .post("http://localhost:3000/delete-expense/" + myExp.id)
      .then(() => {
        list.removeChild(li);
      })
      .catch((err) => {
        document.body.innerHTML += "Something Went Wrong!";
        console.log(err);
      });
  });

  li.appendChild(deleteBtn);

  list.appendChild(li);
}
