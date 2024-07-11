import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(deliveryOptionId === option.id){
      deliveryOption = option
    }
  });

  return deliveryOption || deliveryOption[0];
}

function isWeekend(date){

  const dateOfWeek = date.format('dddd');
  return dateOfWeek === 'Saturday' || dateOfWeek === 'Sunday';

}

export function calculateDeliveryOption(deliveryOption){

  let remainingDay = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while(remainingDay > 0){
    deliveryDate = deliveryDate.add(1, 'day');

    if(!isWeekend(deliveryDate)){
      remainingDay--;
    }

  }
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}