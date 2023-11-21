import { deliveryOptions, getDeliveryOption } from "../data/deliveryOptions.js";
import { getFormattedDate } from "./orders/ordersModules.js";
import { getProduct } from "../data/products.js";

const orders = JSON.parse(localStorage.getItem('orders'));
var order;

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('order');
const productId = urlParams.get('product');

// function to retreive the current product (from a certain order)
function getProductFromOrder(orders, orderId, productId) {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].orderId === orderId) {
            order = orders[i]; // when we find our order, we save in in the "order" variable
            for (var j = 0; j < orders[i].products.length; j++) {
                if (orders[i].products[j].productId === productId) {
                    return orders[i].products[j]; // if product found, we return it
                }
            }
        }
    }
    return null; // in case if product not found
}
const productFromOrder = getProductFromOrder(orders,orderId,productId);
const productFromData = getProduct(productId);

// get delivery option's price
let deliveryOption = getDeliveryOption(productFromOrder.deliveryOptionId);

// use the method to get the correct delivery date depending on the delivery option chosen
const deliveryDate = getFormattedDate(order.orderTimeSent, deliveryOption.deliveryDays);

const orderTrackingHTML = `
<a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>

    <div class="delivery-date">
        Arriving on ${deliveryDate}
    </div>

    <div class="product-info">
        ${productFromData.name}
    </div>

    <div class="product-info">
        Quantity: ${productFromOrder.quantity}
    </div>

    <img class="product-image" src="${productFromData.image}">

    <div class="progress-labels-container">
        <div class="progress-label">
        Preparing
        </div>
        <div class="progress-label current-status">
        Shipped
        </div>
        <div class="progress-label">
        Delivered
        </div>
    </div>

    <div class="progress-bar-container">
    <div class="progress-bar"></div>
</div>
`;

document.querySelector('.js-order-tracking').innerHTML = orderTrackingHTML;