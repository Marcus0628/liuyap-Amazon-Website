import { deliveryOptions } from "./deliveryOptions.js";


class Cart{

  cartItem;
  #localStorageKey;

  constructor(localStorageKey){
    this.#loadFromStorage();
    this.#localStorageKey = localStorageKey;
  }

  #loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
    }];
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

  addToCart(productId){

    let matchingItem;
  
    this.cartItem.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
     
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  
    const quantity = Number(quantitySelector.value);
  
    if(matchingItem){
      matchingItem.quantity += quantity;
    } else {
      this.cartItem.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
    }
    saveToStorage();
  }
  
  calculateCartQuantity(){
    let cartQuantity = 0;
  
    this.cartItem.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

  removeFromCart(productId){
    let newCart = [];
  
    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      } 
    });
  
  
    this.cartItem = newCart;
    saveToStorage();
  }

  updateQuantity(productId, newQuantity){
    let matchingItem;
    this.cartItem.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }

  validDeliveryOptionId(deliveryOptionId){
    let validDeliveryOptionId;
    deliveryOptions.forEach((option)=>{
      if(deliveryOptionId === option.id){
        validDeliveryOptionId = option;
      }
    })
    return validDeliveryOptionId
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });
  
    if(!matchingItem){
      return
    } else if (!validDeliveryOptionId(deliveryOptionId)){
      return
    }
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }

}

const cart = new Cart('cart-final-test');
const testCart = new Cart('cart-test');

console.log(cart);
console.log(testCart);
