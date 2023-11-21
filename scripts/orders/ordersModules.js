import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// array that holds all of the orders
let orders = JSON.parse(localStorage.getItem('orders'));
let timeSent = dayjs();
timeSent = timeSent.format('dddd HH:mm, MMMM D');

if(!orders){
    orders = [];
}

// function to pass the current cart to orders page (when "place order" button is clicked)
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
};

// trivial method to use because of a dayjs bug where i cannot modify the localstring order date
export function getFormattedDate(date, days){
    const dateComponents = date.match(/(\w+) (\d+:\d+), (\w+) (\d+)/);
    const dayOfWeek = dateComponents[1];
    const time = dateComponents[2];
    const month = dateComponents[3];
    const dayOfMonth = dateComponents[4];
    
    // Create a new Date object
    let deliveryDate = new Date(`${month} ${dayOfMonth}, ${new Date().getFullYear()} ${time}`);
    
    // Add 3 days
    deliveryDate.setDate(deliveryDate.getDate() + days);
    
    // Format the date without time
    const formattedDate = deliveryDate.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
    
    return formattedDate;
};

