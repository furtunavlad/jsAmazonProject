// array that holds all of the orders
export let orders = [];

export function pushCartToOrder(cart){
    orders.push(cart);
    let ordersString = JSON.stringify(orders);
    localStorage.setItem('orders', ordersString);
};


