let submit = document.getElementById("submit");
let items = document.getElementById("items");
let form = document.getElementById("form");

// Adding event listener to add expense into list and local storage
submit.addEventListener("click", addExpense);

let editing = false;

function addExpense(e) {
  e.preventDefault();

  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  if (amount === "" || description === "" || category === "") {
    alert("Fill Fields!");
  } else {
    let myExp = {
      amount: amount,
      description: description,
      category: category,
    };

    // If editing an expense
    if (editing) {
      id = document.getElementById("id");
      myExp.id = id.value;
      axios
        .put("http://localhost:3000/add-expense", myExp)
        .then((response) => {
          console.log(response);
          showExpenses(response.data.newExpense);
        })
        .catch((err) => {
          document.body.innerHTML += "<h6>Something Went Wrong!</h6>";
          console.log(err);
        });
      editing = false;
    }
    // If adding a new expense
    else {
      axios
        .post("http://localhost:3000/add-expense", myExp)
        .then((response) => {
          console.log(response);
          showExpenses(response.data.newExpense);
        })
        .catch((err) => {
          document.body.innerHTML += "<h6>Something WEnt Wrong!</h6>";
          console.log(err);
        });
    }
    form.reset();
  }
}

// For retreiving all expenses stored in the database or table already
axios
  .get("http://localhost:3000/")
  .then((response) => {
    console.log(response);
    response.data.expenses.forEach((expense) => {
      showExpenses(expense);
    });
  })
  .catch((err) => console.log(err));

//   For showing expenses in the front-end coming from the back-end
function showExpenses(myExp) {
  // Creating 'li' element
  let li = document.createElement("li");
  let textNode =
    myExp.amount + " - " + myExp.description + " - " + myExp.category + " ";

  // Adding text to the 'li' element
  li.appendChild(document.createTextNode(textNode));

  // Delete Button
  let deleteBtn = document.createElement("button");
  deleteBtn.id = "delete";

  deleteBtn.appendChild(document.createTextNode("Delete Expense"));

  // Appending delete button to each expense
  li.appendChild(deleteBtn);

  // Edit Button
  let editBtn = document.createElement("button");
  editBtn.id = "edit";

  editBtn.appendChild(document.createTextNode("Edit Expense"));

  // Appending edit button to each expense
  li.appendChild(editBtn);

  // Adding list item into ordered list
  items.appendChild(li);

  // Event listener to delete any expense from database and list
  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/delete-expense/" + myExp.id)
      .then(() => items.removeChild(li))
      .catch((err) => {
        document.body.innerHTML += "<h6>Something Went Wrong!</h6>";
        console.log(err);
      });
  });

  // Event listener for editing any expense and before that deleting the expense from list and database
  editBtn.addEventListener("click", function (e) {
    e.preventDefault();
    editing = true;
    axios
      .post("http://localhost:3000/edit-expense/" + myExp.id + "?edit=true")
      .then((response) => {
        const myExp = response.data.expenses;
        id.value = myExp.id;
        amount.value = myExp.amount;
        description.value = myExp.description;
        category.value = myExp.category;
        items.removeChild(li);
      })
      .catch((err) => {
        document.body.innerHTML += "<h6>Something Went Wrong</h6>";
        console.log(err);
      });
  });
}
