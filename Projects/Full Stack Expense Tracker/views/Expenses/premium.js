let premium = document.getElementById("premium");
let p = document.getElementById("status");
let show = document.getElementById("show");
let report = document.getElementById('report');
let token;

document.addEventListener("DOMContentLoaded", async () => {
  token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/is-premium", {
    headers: { Authorization: token },
  });

  if (response.data.premium) {
    premium.style.display = "none";
    p.innerHTML = "You're a Premium Member!";
    show.removeAttribute("hidden");
    report.removeAttribute("hidden");
  }
});

premium.addEventListener("click", async (e) => {
  const response = await axios.get("http://localhost:3000/buy-premium", {
    headers: { Authorization: token },
  });

  var options = {
    key: response.data.key_id,
    order: response.data.order.id,
    handler: (response) => {
      updateTransaction(options.order, response.razorpay_payment_id, "SUCCESS");
    },
  };

  const rzpy1 = new Razorpay(options);

  rzpy1.on("payment.failed", (response) => {
    alert("Payment Failed!");
    updateTransaction(options.order, null, "FAILED");
    console.log(response);
  });

  rzpy1.open();
  e.preventDefault();
});

async function updateTransaction(orderId, paymentId, status) {
  const response = await axios.post(
    "http://localhost:3000/purchase/update-transaction-status",
    {
      order_id: orderId,
      payment_id: paymentId,
      status: status,
    },
    {
      headers: { Authorization: token },
    }
  );

  if (status === "SUCCESS") {
    alert("You're now a premium member!");
    premium.style.display = "none";
    p.innerHTML = "You're now a Premium Member!";
    show.removeAttribute("hidden");
    report.removeAttribute("hidden");
  }
}

report.addEventListener("click", showTable);

function showTable(e) {
  e.preventDefault();

  window.location.href = "./report.html";
}
