import { calculateCartQuantity, cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { calculateDeliveryOption, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary(){

  let cartSummarHTML='';

  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const dateString = calculateDeliveryOption(deliveryOption);

  cartSummarHTML += `
  <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name js-product-name-${matchingProduct.id}">
          ${matchingProduct.name}
        </div>
        <div class="product-price js-product-price-${matchingProduct.id}">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update"
          data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input type="text" class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}"
          data-product-id="${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save"
          data-product-id="${matchingProduct.id}">
            save
          </span>
          <span class="delete-quantity-link link-primary js-delete js-delete-${matchingProduct.id}"
          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct,cartItem)}
      </div>
    </div>
    </div>
  `;


  })
  document.querySelector('.js-order-summary')
    .innerHTML = cartSummarHTML;


  function deliveryOptionsHTML(matchingProduct,cartItem){

    let html ='';

    deliveryOptions.forEach((deliveryOption)=>{

      const dateString = calculateDeliveryOption(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
      ? 'FREE' 
      : `$${formatCurrency(deliveryOption.priceCents)} -`

      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
      
      html += `
      <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `;

    });

    return html;
  }  





  document.querySelectorAll('.js-delete')
    .forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        removeFromCart(productId);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      })
    });

  document.querySelectorAll('.js-update')
    .forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.add('is-editing');
      });
    })  

  document.querySelectorAll('.js-save')
    .forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;

        const input =  document.querySelector(`.js-quantity-input-${productId}`);

        const newQuantity = Number(input.value);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.remove('is-editing');

        if(newQuantity <= 0 || newQuantity >= 1000){
          alert('Error');
          return
        }

        updateQuantity(productId, newQuantity);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll('.js-quantity-input')
      .forEach((input)=>{
        input.addEventListener('keydown', (event)=>{
          const productId = input.dataset.productId;
          if(event.key === 'Enter'){
            const input =  document.querySelector(`.js-quantity-input-${productId}`);

            const newQuantity = Number(input.value);
    
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
    
            container.classList.remove('is-editing');
    
            if(newQuantity <= 0 || newQuantity >= 1000){
              alert('Error');
              return
            }
    
            updateQuantity(productId, newQuantity);
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
          }
        });
      });

    document.querySelectorAll('.js-delivery-option')
      .forEach((element)=>{
        element.addEventListener('click', ()=>{
          const productId = element.dataset.productId;
          const deliveryOptionId = element.dataset.deliveryOptionId;
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        });
      })
}
