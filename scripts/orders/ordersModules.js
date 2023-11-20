import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// array that holds all of the orders
let orders = JSON.parse(localStorage.getItem('orders'));
let timeSent = dayjs();
timeSent = timeSent.format('dddd HH:mm, MMMM D');

if(!orders){
    orders = [];
}

export function pushCartToOrder(cart){
    orders.push({
        orderId: generateOrderId(),
        orderTimeSent: timeSent,
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


