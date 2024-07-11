import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProductFetch } from "../../data/products.js";
import { loadPage } from "../../script/checkout.js";
import { renderCheckoutHeader } from "../../script/checkout/checkoutHeader.js";
import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { renderPaymentSummary } from "../../script/checkout/paymentSummary.js";

describe('Test Suite: renderOrderSummary', ()=>{
  const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll(async () => {
    await loadProductFetch();
  });

  beforeEach(()=>{
    document.querySelector('.js-test-container')
      .innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
      `;


      
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: product1,
        quantity: 2,
        deliveryOptionId: '1',
      
      }, {
        productId: product2,
        quantity: 1,
        deliveryOptionId: '2',
      }]);
    });
    loadFromStorage();
    renderCheckoutHeader()
    renderOrderSummary();
    renderPaymentSummary();
  });

  afterEach(()=>{
    document.querySelector('.js-test-container')
      .innerHTML = ''
  })
  

  it('Display the page', ()=>{
    
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${product1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${product2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${product1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    
    expect(
      document.querySelector(`.js-product-name-${product2}`).innerText
    ).toEqual('Intermediate Size Basketball');

    expect(
      document.querySelector(`.js-product-price-${product1}`).innerText
    ).toEqual('$10.90')

  });

  it('Remove a product', ()=>{

    document.querySelector(`.js-delete-${product1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${product1}`)
    ).toEqual(null);
    
    expect(
      document.querySelector(`.js-cart-item-container-${product2}`)
    ).not.toEqual(null);

    expect(cart[0].productId).toEqual(product2);

    expect(
      document.querySelector(`.js-product-name-${product2}`).innerText
    ).toEqual('Intermediate Size Basketball');

    expect(
      document.querySelector(`.js-product-price-${product2}`).innerText
    ).toEqual('$20.95')

  });

  it('Updates the delivery option', ()=>{

    document.querySelector(`.js-delivery-option-${product1}-3`)
    .click();

    expect(
    document.querySelector(`.js-delivery-option-input-${product1}-3`)
    .checked
    ).toEqual(true);

    expect(cart.length).toEqual(2);

    expect(cart[0].productId).toEqual(product1);

    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98')

    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50')

  })


});