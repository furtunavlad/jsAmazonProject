// array that holds all of the orders
let orders = JSON.parse(localStorage.getItem('orders'));

if(!orders){
    orders = [];
}

export function pushCartToOrder(cart){
    orders.push(cart);
    let ordersString = JSON.stringify(orders);
    localStorage.setItem('orders', ordersString);
};


