import { products } from "../data/products.js";

console.log(JSON.parse(localStorage.getItem('orders')));

document.querySelector('.js-cart-quantity').innerHTML = localStorage.getItem('cartQuantity');

let orders = JSON.parse(localStorage.getItem('orders'));

let orderContainerHTML = '';

orders.forEach((order) => {
    orderContainerHTML += `
        <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>August 12</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$35.06</div>
                </div>
            </div>

            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
        </div>

        <div class="order-details-grid">
    `;

    order.forEach((item) =>{
        orderContainerHTML += `
        <div class="product-image-container">
            <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
        </div>

        <div class="product-details">
            <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
            </div>
            <div class="product-delivery-date">
                Arriving on: August 15
            </div>
            <div class="product-quantity">
                Quantity: 1
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

    orderContainerHTML += `
        </div>
        <br>
    `;
});

document.querySelector('.js-order-container').innerHTML = orderContainerHTML;

