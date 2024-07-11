import { loadCart, loadCartFetch } from "../data/cart.js";
import { loadProductFetchAsync, loadProductFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import  "../data/cart-class.js";
//import "../data/car.js";
/*
loadProduct(()=>{
  renderCheckoutHeader()
  renderPaymentSummary()
  renderOrderSummary();
});
*/

/*
Promise.all([
  loadProductFetchAsync(),

  
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    })
  })
  

 loadCartFetch(),

]).then(()=>{
  renderCheckoutHeader()
  renderPaymentSummary()
  renderOrderSummary();
});
*/


export async function loadPage(){
  await Promise.all([
  loadProductFetch(),
  loadCartFetch(),
  ]);

  renderCheckoutHeader()
  renderPaymentSummary()
  renderOrderSummary();


}
loadPage();




