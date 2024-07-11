import { calculateCartQuantity, cart, clearCart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder, orders } from "../../data/orders.js";


export function renderPaymentSummary(){

  let paymentSummaryHTML = '';
  let productPriceCents = 0;
  let shippingPriceCents = 0; 


  const cartQuantity = calculateCartQuantity();

  cart.forEach((cartItem)=>{
      const productId = cartItem.productId;
      const product = getProduct(productId);
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

      productPriceCents += cartItem.quantity * product.priceCents;
      shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1
  const totalCents = totalBeforeTaxCents + taxCents;

  paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(shippingPriceCents)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(totalCents)}</div>
  </div>

  <button class="place-order-button button-primary js-place-order">
    Place your order
  </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;


  document.querySelector('.js-place-order')
    .addEventListener('click', async()=>{
      try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json()
      addOrder(order);
      console.log(orders);
      } catch (error){
        console.log('Unexpected error. Please try again');
      }

      clearCart();
      window.location.href = 'orders.html';
    });

  console.log(orders);

}

