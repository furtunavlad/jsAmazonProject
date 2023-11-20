// array that holds all of the orders
let orders = JSON.parse(localStorage.getItem('orders'));

if(!orders){
    orders = [];
}

export function pushCartToOrder(cart){
    orders.push({
        orderId: generateOrderId(),
        products: cart
    });
    let ordersString = JSON.stringify(orders);
    localStorage.setItem('orders', ordersString);
};

// function to generate an order id
function generateOrderId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  
    // Combine timestamp and random number to create a unique order id
    const orderId = `${timestamp}-${randomNum}`;
  
    return orderId;
}


