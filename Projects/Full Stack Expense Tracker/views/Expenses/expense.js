let form = document.getElementById("expense");
let expense = document.getElementById("submit");
let list = document.getElementById("expenses");
let expenseBody = list.querySelector("tbody");
const pagination = document.getElementById("pagination");
let exp_page = document.getElementById("exp_page");

exp_page.addEventListener("change", (e) => {
  let entries = exp_page.value;
  localStorage.setItem("exp_page", entries);
  location.reload();
});

expense.addEventListener("click", addExpense);

function clearExpense() {
  while (expenseBody.firstChild) {
    expenseBody.removeChild(expenseBody.firstChild);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getProducts(1);
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
        // showExpenses(response.data.expense);
        location.reload();
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

  expenseBody.appendChild(tr);
}

function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
  lastPage,
  expenses
}) {
  pagination.innerHTML = "";

  if (currentPage != 1 && currentPage - 1 > 1) {
    const btn6 = document.createElement("button");
    btn6.innerHTML = "1";
    btn6.addEventListener("click", () => getProducts(1));
    pagination.appendChild(btn6);
    btn6.className = "pagination-btn";
    if (currentPage - 1 > 2) {
      const btn7 = document.createElement("button");
      btn7.innerHTML = "...";
      pagination.appendChild(btn7);
      btn7.className = "pagination-btn";
    }
  }

  if (hasPreviousPage) {
    const btn2 = document.createElement("button");
    btn2.innerHTML = previousPage;
    btn2.addEventListener("click", () => getProducts(previousPage));
    pagination.appendChild(btn2);
    btn2.className = "pagination-btn";
  }

  if(expenses.length != 0) {
    const btn1 = document.createElement("button");
    btn1.innerHTML = `<h3>${currentPage}</h3>`;
    btn1.addEventListener("click", () => getProducts(currentPage));
    pagination.appendChild(btn1);
    btn1.className = "pagination-btn";
  }

  if (hasNextPage) {
    const btn3 = document.createElement("button");
    btn3.innerHTML = nextPage;
    btn3.addEventListener("click", () => getProducts(nextPage));
    pagination.appendChild(btn3);
    btn3.className = "pagination-btn";
  }

  if (lastPage - nextPage > 1) {
    const btn5 = document.createElement("button");
    btn5.innerHTML = "...";
    pagination.appendChild(btn5);
    btn5.className = "pagination-btn";
  }

  if (nextPage != lastPage && currentPage != lastPage && lastPage != 0) {
    const btn4 = document.createElement("button");
    btn4.innerHTML = lastPage;
    btn4.addEventListener("click", () => getProducts(lastPage));
    pagination.appendChild(btn4);
    btn4.className = "pagination-btn";
  }
}

function getProducts(page) {
  clearExpense();
  // Taking out the token for that logged in particular user for further storing their details
  entries = localStorage.getItem("exp_page");
  exp_page.value = entries;
  console.log(entries);
  const token = localStorage.getItem("token");
  axios
    .get(`http://localhost:3000/expenses?page=${page}`, {
      headers: { Authorization: token, exp_page: entries }, // Passing the token in the header for verification through jwt
    })
    .then((response) => {
      console.log(response);
      response.data.expenses.forEach((expense) => {
        showExpenses(expense);

        console.log(expense);
      });
      showPagination(response.data);
    })
    .catch((err) => console.log(err));
}
