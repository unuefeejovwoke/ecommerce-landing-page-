const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');

const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btncart');

const btnPlus = document.querySelector('#btnPlus');
const btnMenu = document.querySelector('#btnMenu');
const productCounter = document.querySelector('.counter');

const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.product-hero');

const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

const btnAddToCart = document.querySelector('.btn');
const cartCount = document.querySelector('.cart-count');
const productInShoppingCart = document.querySelector('.product-in-cart');

const msgEmpty = document.querySelector('.msg-empty');
const checkbox = document.querySelector('.checkbox');

//numerical variables
let productCounterValue =1;
let productInCart = 0;
let price = 250.0;
let discount = 0.5;

btnHamburger.addEventListener('click', onHamburgerClick);
btnMenuClose.addEventListener('click', onBtnMenuCloseClick);

btnCart.addEventListener('click', openCart);

btnPlus.addEventListener('click', productCounterPlus);
btnMinus.addEventListener('click', productCounterMinus);

gallery.forEach(img => {
    img.addEventListener('click', onThumbClick)
});

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);

btnAddToCart.addEventListener('click', addToCart);

function onHamburgerClick() {
    menu.classList.remove('hidden');
}

function onBtnMenuCloseClick() {
    menu.classList.add('hidden');
}

function openCart() {
    cart.classList.toggle('hidden');
}

function productCounterPlus(){
    setProductCounter(1);
}

function productCounterMinus(){
    setProductCounter(-1);
}

function setProductCounter(value){
    if ((productCounterValue + value) > 0){
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue;
    }
}

function onThumbClick(event){
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    event.target.parentElement.classList.add('active');
    heroImg.src = event.target.src.replace('-thumbnail', '');
}

function handleBtnClickNext(){
    let imageIndex = getCurrentToggleIndex();
    imageIndex++;
    if (imageIndex > 4){
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious(){
    let imageIndex = getCurrentToggleIndex();
    imageIndex--;
    if (imageIndex < 1){
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function getCurrentToggleIndex(){
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setHeroImage(imageIndex){
    heroImg.src = `./images/image-product-${imageIndex}.jpg`;

    gallery.forEach(img => {
        img.classList.remove('active');
    });
    gallery[imageIndex-1].classList.add('active');
}

function addToCart(){
    productInCart += productCounterValue;

    const productHTMLElement = `
    <div class="item">
            <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1">
            <div class="details">
              <div class="product-name">Autumn Limited Edition...</div>
              <div class="price-group">
                <div class="price">$${(price*discount).toFixed(2)}</div> x
                <div class="count">${productInCart}</div>
                <div class="total-amount">$${(price*discount*productInCart).toFixed(2)}</div>
              </div>
            </div>
            <img id="btnDelete" src="./images/icon-delete.svg" alt="">
    </div>
    `;

    productInShoppingCart.innerHTML = productHTMLElement;

    updateCart();

    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.addEventListener('click', onBtnDeleteClick);
}

function updateCart(){  
    updateCartIcon();
    updateMsgEmpty();
    updateCheckButton();
}

function updateCartIcon(){
    cartCount.textContent = productInCart;
    if (productInCart == 0){
        if (!cartCount.classList.contains('hidden')){
            cartCount.classList.add('hidden');
        }
    
    } else {
        cartCount.classList.remove('hidden');
    }
}

function updateMsgEmpty(){
    if (productInCart == 0) {
        if (msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.remove('hidden');
        }
    } else {
        if (!msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.add('hidden');
        }
    }
}

function updateCheckButton(){
    if (productInCart == 0){
        if (!checkbox.classList.contains('hidden')){
            checkbox.classList.add('hidden');
        }
    } else{
        checkbox.classList.remove('hidden');
    }
}

function onBtnDeleteClick(){
    productInCart--;
    updateCart();

    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML = productInCart;
    totalAmount.innerHTML = `$${(price*discount*productInCart).toFixed(2)}`;

    if (productInCart == 0){
        productInShoppingCart.innerHTML = '';
    }
}



