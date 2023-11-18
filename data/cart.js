export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [];
    localStorage.setItem("cartQuantity", 0);
}

export function setCart(newCart) {
    cart = newCart;

    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];
    let thisProductQuantity;

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        } else if (cartItem.productId == productId){
            thisProductQuantity = cartItem.quantity;
        }
    });

    localStorage.setItem("cartQuantity", localStorage.getItem("cartQuantity") - thisProductQuantity);

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}