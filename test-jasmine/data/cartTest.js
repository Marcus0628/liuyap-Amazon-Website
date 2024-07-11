import { addToCart, loadFromStorage, cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

/*
describe('Test Suite: addToCart', ()=>{
  it('Adds an existing product to the cart', ()=>{

  });

  it('Adds an new product to the cart', ()=>{
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([])
    });
    loadFromStorage();

    

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);


  });
});
*/

describe('Test Suite: removeFromCart', ()=>{
  const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      }]);
    })
    loadFromStorage();
  });

  it('Remove a product from the cart', ()=>{
    removeFromCart(product1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(product2);
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-final',
      JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      }])
    );
  });

  it('Does nothing if product is not in the cart', ()=>{
    removeFromCart('Not-Exist');
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(product1);
    expect(cart[0].quantity).toEqual(2);

  });

});

describe('Test Suite: updateDeliveryOption', ()=>{

  it('Update the delivery option of a product in the cart', ()=>{
    const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      }]);
    })
    loadFromStorage();
    updateDeliveryOption(product1, '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-final', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '3',
    }]));

  });

  it('Update the delivery option of a productId that is not in the cart', ()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      }]);
    });
    loadFromStorage();
    updateDeliveryOption('not-Exist', '2');
    
    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });

  it('Update the delivery option of a deliveryOptionId that is not in the cart', ()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      }]);
    });
    loadFromStorage();
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '5');

    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });

});