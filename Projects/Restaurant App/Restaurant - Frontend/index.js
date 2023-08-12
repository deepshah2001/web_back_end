// Get all the elements using its id
let submit = document.getElementById("submit");
let form = document.getElementById("form");

let table_1 = document.getElementById("table1");
let table_2 = document.getElementById("table2");
let table_3 = document.getElementById("table3");

submit.addEventListener("click", addOrder);

function addOrder(e) {
  e.preventDefault();

  // Getting values from the form
  let price = document.getElementById("price").value;
  let dish = document.getElementById("dish").value;
  let table = document.getElementById("table").value;

  if (price === "" || (dish === "") | (table === "")) {
    alert("Please fill out all the fields in the form!");
  } else {
    let myOrder = {
      price: price,
      dish: dish,
      table: table,
    };

    // Adding new order to the table or database
    axios
      .post("http://localhost:3000/add-order", myOrder)
      .then((response) => {
        showOrders(response.data.newOrder);
      })
      .catch((err) => {
        document.body.innerHTML += "<h6>Something Went Wrong!</h6>";
        console.log(err);
      });
  }
}

// Retrieving all the orders present in the table or database already
axios
  .get("http://localhost:3000/")
  .then((response) => {
    response.data.orders.forEach((order) => {
      showOrders(order);
    });
  })
  .catch((err) => {
    document.body.innerHTML += "<h6>Something Went Wrong!</h6>";
    console.log(err);
  });

// For showing the orders in front-end
function showOrders(order) {
  const li = document.createElement("li");

  const text = order.price + " - " + order.dish;

  li.appendChild(document.createTextNode(text));

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete";

  deleteBtn.appendChild(document.createTextNode("Delete Order"));

  li.appendChild(deleteBtn);

  // Appending to the list according to the table number
  if (order.table === "1") {
    table_1.appendChild(li);
  } else if (order.table === "2") {
    table_2.appendChild(li);
  } else {
    table_3.appendChild(li);
  }

  // Deleting an order using the order id from the table or database
  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/delete-order/" + order.id)
      .then(() => {
        if (order.table === "1") {
          table_1.removeChild(li);
        } else if (order.table === "2") {
          table_2.removeChild(li);
        } else {
          table_3.removeChild(li);
        }
      })
      .catch((err) => {
        document.body.innerHTML += "<h6>Something Went Wrong!</h6>";
        console.log(err);
      });
  });

  form.reset();
}
