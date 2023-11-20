import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../data/deliveryOptions.js";

console.log(JSON.parse(localStorage.getItem('orders')));

document.querySelector('.js-cart-quantity').innerHTML = localStorage.getItem('cartQuantity');

let orders = JSON.parse(localStorage.getItem('orders'));

let orderContainerHTML = '';

orders.forEach((order) => {
    // variable to calculate the order total price in $
    let orderTotalCost = 0;

    // for each new order we create a new html
    let newOrderContainerHTML = '';
    newOrderContainerHTML += `
        <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${order.orderTimeSent}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>orderTotalCost</div>
                </div>
            </div>

            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.orderId}</div>
            </div>
        </div>

        <div class="order-details-grid">
    `;

    order.products.forEach((product) =>{
        // get delivery option's price
        let deliveryOption = getDeliveryOption(product.deliveryOptionId);
        let deliveryOptionPrice = deliveryOption.priceCents;

        // for each product we get the product details (from the products array) using "getProduct" function
        const matchingProduct = getProduct(product.productId);

        // increment the orderTotalCost with every product's price
        orderTotalCost += matchingProduct.priceCents * product.quantity;

        // increment the orderTotalCost with every product's delivery price
        orderTotalCost += deliveryOptionPrice;

        // for each product we create new html code
        newOrderContainerHTML += `
        <div class="product-image-container">
            <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
                Arriving on: August 15
            </div>
            <div class="product-quantity">
                Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
            </a>
        </div>
        `;
    });

    // close the order-details-grid div and add a line break
    newOrderContainerHTML += `
        </div>
        <br>
    `;

    // add the 10% tax so the order cost matches the cost when order was placed
    orderTotalCost += orderTotalCost / 10;

    // format the price from cents to $
    orderTotalCost = formatCurrency(orderTotalCost);

    // add the order's final price
    newOrderContainerHTML = newOrderContainerHTML.replace('orderTotalCost', `$${orderTotalCost}`)

    // add the new order html at the top of the existing orders
    orderContainerHTML = newOrderContainerHTML + orderContainerHTML;
});

document.querySelector('.js-order-container').innerHTML = orderContainerHTML;

