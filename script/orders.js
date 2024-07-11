
import { orders } from "../data/orders.js";
import { getProduct, loadProductFetch}  from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { calculateCartQuantity, addToCart } from "../data/cart.js";

export async function loadPage(){

  await loadProductFetch();

  let ordersPageHTML='';

  console.log(orders);

  orders.forEach((order)=>{
    
    const orderTimeString = dayjs(order.orderTime).format('MMMM D')

  ordersPageHTML += `
  <div class="order-container">

  <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${orderTimeString}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${formatCurrency(order.totalCostCents)}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${order.id}</div>
    </div>
  </div>

  <div class="order-details-grid">
    ${orderDetailsGridHTML(order)}
  </div>
</div>
  `;

});

  document.querySelector('.js-orders-grid')
    .innerHTML = ordersPageHTML;

  function orderDetailsGridHTML(order){
    let html='';

    order.products.forEach((product)=>{

      const dateString = dayjs(product.estimatedDeliveryTime).format('MMMM D');

      const productDetails = getProduct(product.productId);

    html += `
    <div class="product-image-container">
      <img src="${productDetails.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${productDetails.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dateString}
      </div>
      <div class="product-quantity">
        Quantity: ${product.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again"
      data-product-id="${productDetails.id}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${order.id}&productId=${productDetails.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
    `;
  })
  
    return html;
  }

  document.querySelectorAll('.js-buy-again')
    .forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        console.log(`Buy Again: ${productId}`);
        addToCart(productId);
        displayCartQuantity();
      })
    })



  
}
loadPage();
function displayCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}
displayCartQuantity();


