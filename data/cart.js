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

// add to cart a product in a certain quantity
export function addToCart(productId, quantity){
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    // if already in the cart, increase the existing quantity with the selected (new) quantity
    if(matchingItem){
        matchingItem.quantity += quantity;
    } else {
        // otherwise, if the product is not in the cart, create a new instance
        // with the selected quantity
        // and the default delivery option '1'
        cart.push({
            productId: productId,
            quantity: quantity,
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