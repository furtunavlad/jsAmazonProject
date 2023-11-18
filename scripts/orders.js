console.log(JSON.parse(localStorage.getItem('orders')));
document.querySelector('.js-cart-quantity').innerHTML = localStorage.getItem('cartQuantity');