let premium = document.getElementById('premium');

premium.addEventListener('click', async (e) => {

    const token = localStorage.getItem('token');

    const response = await axios.get("http://localhost:3000/buy-premium", {headers: {"Authorization": token}});
    console.log(response);

    var options = {
        "key": response.data.key_id,
        "order": response.data.order.id,
        "handler": async (response) => {
            await axios.post("http://localhost:3000/purchase/update-transaction-status", {
                order_id: options.order_id,
                payment_id: response.id }, {
                    headers: {"Authorization": token}
                });
            alert("You are now a premium member!");
        },
    }

    const rzpy1 = new Razorpay(options);
    rzpy1.open();
    e.preventDefault();

    rzpy1.on('payment.failed', () => {
        console.log(response);
        alert("Payment Error!");
    })
});