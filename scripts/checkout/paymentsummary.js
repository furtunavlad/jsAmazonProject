import { cart, setCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${localStorage.getItem("cartQuantity")}):</div>
        <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
        </div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
        </div>
    </div>

    <button class="place-order-button button-primary js-place-order-btn">
        Place your order
    </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    // if "place order btn" is pressed the orders should be sent
    // and we should be redirected to orders page, while clearing the cart
    const placeOrderBtn = document.querySelector('.js-place-order-btn');

    // when "place your order" button is clicked
    placeOrderBtn.addEventListener('click', () => {
        if(cart.length != 0){
            // redirect to "orders.html"
            window.location.href = "orders.html";
            // globally empty cart to [] using a function imported from cart.js
            setCart([]);
    
            // reset the localstorage item "cartQuantity" to 0
            localStorage.setItem("cartQuantity", 0);
        }
    });


}