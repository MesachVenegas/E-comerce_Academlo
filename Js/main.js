import { items } from './_prodcuts.mjs';
import { addProduct } from './_cart.mjs';

const changeMode = () => {
    const mode = document.getElementById('mode');
    const webContent = document.getElementById('body');
    const icon = document.getElementById('icon-mode')
    mode.addEventListener('click', e => {
        if (icon.classList.contains("fa-moon")) {
            icon.classList.replace("fa-moon", "fa-sun")
        } else {
            icon.classList.replace("fa-sun", "fa-moon")
        }
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

document.addEventListener('DOMContentLoaded', () => {
    changeMode()
    menuToggle()
    cartToggle()
    navScroll()
    loadProducts(items)
    addProduct(items)
})