import { addToCart, calculateCartQuantity, cart } from "../data/cart.js";
import { loadProduct, loadProductFetch, products } from "../data/products.js";


//loadProduct(renderProductGrid);
Promise.all([
  loadProductFetch()
]).then(()=>{
  renderProductGrid()
})


function renderProductGrid(){

  let productsHTML='';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if(search){
    filteredProducts = products.filter((product)=>{

      //return product.name.includes(search);

      let matchingKeyword = false;

      product.keywords.forEach((keyword)=>{
        if(keyword.toLowerCase().includes(search.toLowerCase())){
          matchingKeyword = true;
        }
      });

      return matchingKeyword || 
        product.name.toLowerCase().includes(search.toLowerCase());

    })
  }


  filteredProducts.forEach((product)=>{

    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarURL()}">
          <div class="product-rating-count link-primary">
          ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPriceCents()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="extra-info">
        ${product.extraInfoHTML()}
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;

  });

  function updateCartQuantity(){
    let cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }
  updateCartQuantity();

  function displayAddedMessage(productId){

    const added = document.querySelector(`.js-added-to-cart-${productId}`);
    added.classList.add('added-to-cart2');

    const timeoutId = setTimeout(()=>{
      added.classList.remove('added-to-cart2');
    }, 2000);

    return timeoutId;
  }

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button)=>{
      let addedMessageTimeOutId;

      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        console.log(`Add: ${productId}`);
        addToCart(productId);
        updateCartQuantity();
        console.log(cart);

        if(addedMessageTimeOutId){
          clearTimeout(addedMessageTimeOutId);
        }

        addedMessageTimeOutId = displayAddedMessage(productId);

      });
    });
  //console.log(cart);

    document.querySelector('.js-search-button')
      .addEventListener('click', ()=>{

       const input = document.querySelector('.js-search-bar').value;
       window.location.href = `amazon.html?search=${input}`

      });

    document.querySelector('.js-search-bar')
      .addEventListener('keydown', (event)=>{
        if(event.key === 'Enter'){
          const input = document.querySelector('.js-search-bar').value;
          window.location.href = `amazon.html?search=${input}`
        }
      })

  }