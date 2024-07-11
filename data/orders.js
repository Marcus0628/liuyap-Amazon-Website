export const orders = JSON.parse(localStorage.getItem('order-final'))||[];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('order-final', JSON.stringify(orders));
}

export function getOrder(orderId){
  let matchingOrder;
  orders.forEach((order)=>{
    if(order.id === orderId){
      matchingOrder = order
    }
  });
  return matchingOrder;
}

export function getOrderProduct(orderId,productId){
  let matchingOrder;
  orders.forEach((order)=>{
    if(order.id === orderId){
      matchingOrder = order
    }
  });


  let matchingOrderProduct;
  matchingOrder.products.forEach((product)=>{
    if(product.productId === productId){
      matchingOrderProduct = product;
    }
  })
  return matchingOrderProduct
}