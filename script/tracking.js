import { calculateCartQuantity } from "../data/cart.js";
import { getProduct, loadProductFetch, products } from "../data/products.js";
import { getOrder, getOrderProduct, orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

async function loadPage(){
   await loadProductFetch()


const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

console.log(orderId);
console.log(productId);
console.log(orders);


let orderTrackingHTML='';


const product = getProduct(productId);

const orderProduct = getOrderProduct(orderId,productId);

const deliveryDate = dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D');

const order = getOrder(orderId);

const currentTime = dayjs();
const orderTime  = dayjs(order.orderTime);
const deliveryTime  = dayjs(orderProduct.estimatedDeliveryTime);

let percentProgressOfDelivery = 
((currentTime - orderTime)/(deliveryTime - orderTime)) * 100;

const deliveryMessage = currentTime < deliveryTime ? 'Arriving on' : 'Delivered on'
  
  
orderTrackingHTML = `
  <a class="back-to-orders-link link-primary" href="orders.html">
  View all orders
  </a>

  <div class="delivery-date">
  ${deliveryMessage} ${deliveryDate}
  </div>

  <div class="product-info">
    ${product.name}
  </div>

  <div class="product-info">
  Quantity: ${orderProduct.quantity}
  </div>

  <img class="product-image" src="${product.image}">

  <div class="progress-labels-container">
  <div class="progress-label 
  ${percentProgressOfDelivery < 50? 'current-status':''} ">
    Preparing
  </div>
  <div class="progress-label ${percentProgressOfDelivery >= 50 && percentProgressOfDelivery < 100 ? 'current-status':''}">
    Shipped
  </div>
  <div class="progress-label ${percentProgressOfDelivery > 100? 'current-status':''} ">
    Delivered
  </div>
  </div>

  <div class="progress-bar-container">
  <div class="progress-bar" style="width: ${percentProgressOfDelivery}%;"></div>
  </div>
`;



document.querySelector('.js-order-tracking')
  .innerHTML = orderTrackingHTML;


}
loadPage();

function displayCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}
displayCartQuantity();
