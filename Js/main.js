const items = [{
    id: 1,
    name: "Hoodies",
    price: 14.0,
    image: "Assets/images/featured1.png",
    category: "Hoodies",
    quantity: 10,
},
{
    id: 2,
    name: "Shirts",
    price: 24.0,
    image: "Assets/images/featured2.png",
    category: "Shirts",
    quantity: 15,
},
{
    id: 3,
    name: "Sweatshirts",
    price: 24.0,
    image: "Assets/images/featured3.png",
    category: "Shirts",
    quantity: 20,
},
];
const cartItems = [];

const changeMode = () => {
    const mode = document.getElementById('mode');
    const webContent = document.getElementById('body');
    mode.addEventListener('click', e => {
        webContent.classList.toggle('dark')
    })
}

const menuToggle = () => {
    const btnMenu = document.getElementById('menu');
    const menu = document.getElementById('nav-menu');
    const menuLink = document.querySelectorAll('.menu__link');
    // Menu stripes
    const stripe1 = document.getElementById('stripe-1')
    const stripe2 = document.getElementById('stripe-2')
    const stripe3 = document.getElementById('stripe-3')
    btnMenu.addEventListener('click', e => {
        menu.classList.toggle('navbar__menu--open')
        stripe1.classList.toggle('stripe1__menu--open')
        stripe2.classList.toggle('stripe2__menu--open')
        stripe3.classList.toggle('stripe3__menu--open')
    })

    menu.addEventListener('click', e => {
        if (e.target.tagName == "A") {
            menuLink.forEach(link => {
                link.classList.remove('active')
            })
            e.target.classList.add('active')
            menu.classList.toggle('navbar__menu--open')
            stripe1.classList.toggle('stripe1__menu--open')
            stripe2.classList.toggle('stripe2__menu--open')
            stripe3.classList.toggle('stripe3__menu--open')
        }
    })
}

// load products of inventory
const loadProducts = (items) => {
    items.forEach(({ id, name, price, image, category, quantity }) => {
        const product = document.createElement("div")
        product.classList.add("item__card")
        product.setAttribute('id',`item-${id}`)
        product.innerHTML = `
        <div class="item__img">
                    <img class="item__card__img" src="${image}" alt="${name}">
                </div>
                <div class="item__description">
                    <div class="item__wherehouse">
                        <span class="item__price item__price--products">$${price.toFixed(2)}</span>
                        <hr class="item__separator">
                        <span class="item__stock">Stock: ${quantity}</span>
                    </div>
                    <h3 class="item__category">${category}</h3>
                </div>
                <button class="btn item__btn--add" id="${id}">+</button>
        `;
        document.querySelector(".products__container").appendChild(product)
    });
};

const cartToggle = () => {
    const cartOpen = document.getElementById('cart');
    const cartclose = document.getElementById('cart-close');
    const cart = document.getElementById('cart-body');
    const overlay = document.getElementById('overlay-cart')
    const cartItems = document.getElementById('cart-items')
    cartOpen.addEventListener('click', e => {
        cart.classList.add('cart--open')
        cartItems.classList.add('cart--open')
        overlay.classList.add('cart__overlay--open')
    })

    cartclose.addEventListener('click', e => {
        cart.classList.remove('cart--open')
        cartItems.classList.remove('cart--open')
        overlay.classList.remove('cart__overlay--open')
    })
}

const navScroll = () => {
    const navbar = document.querySelector('.navbar')
    window.onscroll = () => {
        if (window.scrollY > 0) {
            navbar.classList.add('navbar--move')
        } else if (window.scrollY == 0) {
            navbar.classList.remove('navbar--move')
        }
    }
}

const addProduct = (cartProducts) =>{
    const productContainer = document.querySelector('.products__container')
    const counter = document.getElementById('cart-counter')
    const empty = document.getElementById('empty-cart');
    const btnChecOut = document.getElementById('checkOut')
    // Agrega items al carrito de compras.
    let selected;
    let cartCounter = 0;
    productContainer.addEventListener('click',e =>{
        empty.style = "display: none";
        if(e.target.tagName == "BUTTON"){
            items.forEach(item => {
                if (item.id == e.target.attributes.id.value){
                    selected = item
                    selected.inCart = 0;
                    if(item.quantity > 0){
                        selected.inCart += 1;
                        cartItems.push(selected)
                        item.quantity--
                        cartCounter++
                    }
                    else{
                        alert("No hay stock Disponible")
                    }
                }
            })
            counter.innerHTML = `${cartCounter}`;
            // Agrega los productos al carrito de compras
            // { id, name, price, image, category, quantity, unity }
            const loadCartProducts = ({ id, name, price, image, category, quantity, inCart }) => {
                const listCartItems = document.getElementById('itemsToBuy')
                const itemsToBuy = document.querySelectorAll('.cart__item')
                const cartItem = document.createElement("div");
                let subTotal = price * inCart;
                cartItem.classList.add("cart__item");
                cartItem.setAttribute('id', `${id}`)
                itemsToBuy.forEach(item => {
                    if (item.attributes.id.value == id) {
                        inCart += 1;
                        item.remove()
                    }
                })
                console.log(subTotal);
                cartItem.innerHTML = `
                <div class="cart__img__container">
                    <img class="cart__img" src="${image}" alt="${name}">
                </div>
                <div class="item__detail">
                    <h3>${category}</h3>
                    <div class="item__stock">
                        <span>Stock: ${quantity}</span>
                        <hr class="item__separator--cart ">
                        <span class="item__price">$${price.toFixed(2)}</span>
                    </div>
                    <p class="item__subtotal">
                        Subtotal: ${subTotal.toFixed(2)}
                    </p>
                    <div class="item__menu">
                        <div class="item__btns">
                            <button class="item__btn" id="decrease-btn">-</button>
                            <span class="item__unities"> ${inCart} Units</span>
                            <button class="item__btn" id="add-btn">+</button>
                        </div>
                        <span class="item__trash__btn" id="trash-item">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </div>
                </div>
                `
                listCartItems.appendChild(cartItem)
            }
            loadCartProducts(selected)
        }
    })
}



document.addEventListener('DOMContentLoaded', () => {
    changeMode()
    menuToggle()
    cartToggle()
    navScroll()
    loadProducts(items)
    addProduct()
})