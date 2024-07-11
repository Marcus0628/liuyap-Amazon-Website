import { Appliance, Clothing, Product } from "../../data/products.js"


describe('Test Suite: Product Class', ()=>{
  let product;

  beforeEach(()=>{

  product = new Product({
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  });
})


  it('Has the correct properties', ()=>{

    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(product.rating.stars).toEqual(4.5);
    expect(product.rating.count).toEqual(87);
    expect(product.priceCents).toEqual(1090);

  })

  it('Get the star URL', ()=>{
    expect(product.getStarURL()).toEqual(`images/ratings/rating-45.png`);
  });

  it('Get the price cents', ()=>{
    expect(product.getPriceCents()).toEqual('$10.90');
  });

  it('Does not display any extra info', ()=>{
    expect(product.extraInfoHTML()).toEqual('');
  });

});

describe('Test Suite: Clothing Class', ()=>{
  let clothing;

  beforeEach(()=>{
    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    })
  })


  it('Has the correct properties', ()=>{

    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");
    expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(clothing.rating.stars).toEqual(4.5);
    expect(clothing.rating.count).toEqual(56);
    expect(clothing.priceCents).toEqual(799);

  })

  it('Get the star URL', ()=>{
    expect(clothing.getStarURL()).toEqual('images/ratings/rating-45.png');
  }); 

  it('Get the price cents', ()=>{
    expect(clothing.getPriceCents()).toEqual('$7.99');
  }); 

  it('Does display any extra info', ()=>{
    expect(clothing.extraInfoHTML()).toContain('Size Chart');

    expect(clothing.extraInfoHTML()).toContain('<a href="images/clothing-size-chart.png" target="_blank">');
  });
});

describe('Test Suite: Appliance Class', ()=>{
  let appliance;

  beforeEach(()=>{
    appliance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: 'appliance',
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
  
    })
  })


  it('Has the correct properties', ()=>{
    expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(appliance.image).toEqual("images/products/black-2-slot-toaster.jpg");
    expect(appliance.name).toEqual("2 Slot Toaster - Black");
    expect(appliance.rating.stars).toEqual(5);
    expect(appliance.rating.count).toEqual(2197);
    expect(appliance.priceCents).toEqual(1899);
  });

  it('Get the star URL', ()=>{
    expect(appliance.getStarURL()).toEqual(`images/ratings/rating-50.png`);
  });

  it('Get the price cents', ()=>{
    expect(appliance.getPriceCents()).toEqual('$18.99');
  }); 

  it('Does display any extra info', ()=>{
    expect(appliance.extraInfoHTML()).toContain('Warranty');
    expect(appliance.extraInfoHTML()).toContain('<a href="images/appliance-instructions.png" target="_blank">');

    expect(appliance.extraInfoHTML()).toContain('Instruction');
    expect(appliance.extraInfoHTML()).toContain('<a href="images/appliance-warranty.png" target="_blank">');
  });
})