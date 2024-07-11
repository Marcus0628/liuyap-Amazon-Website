
export class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo(){
    const trunkStatus = this.isTrunkOpen? 'Open': 'Close'

    console.log(`Brand: ${this.#brand}, Model: ${this.#model}, Speed:${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  get brand(){
    return this.#brand;
  }

  get model(){
    return this.#model;
  }


  go(){
    this.speed += 5;
    if(this.speed > 200){
      this.speed = 200;
    }
  }

  brake(){
    this.speed -= 5;
    if(this.speed < 0){
      this.speed = 0;
    }
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
      this.isTrunkOpen = false;
  }

}

export class Racecar extends Car{

  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  displayInfo(){
    console.log(`Brand: ${this.brand}, Model: ${this.model}, Speed:${this.speed} km/h`);
  }

  go(){
    this.speed += this.acceleration;
    if(this.speed > 300){
      this.speed = 300;
    }
  }

} 

export const car = [{
  brand: 'Toyota',
  model: 'Corrolla',
}, {
  brand: 'Tesla',
  model: 'Model 3'
}, {
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20,
  type: 'racecar'
}].map((carDetails)=>{
  if(carDetails.type === 'racecar'){
    return new Racecar(carDetails);
  }
  return new Car(carDetails);
});


console.log(car[0]);
console.log(car[1]);

car[0].displayInfo();
car[1].displayInfo();

car[0].go();
car[0].displayInfo();

car[0].openTrunk();

car[2].displayInfo();

car[2].go();
car[2].displayInfo();


