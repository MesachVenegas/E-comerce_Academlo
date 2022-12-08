// Variables de control de items en carrito.
let selected = [];
let subTotal = 0;
let insideItems = 0;


export const addProduct = (items) => {
    const productContainer = document.querySelector('.products__container')
    const counter = document.getElementById('cart-counter')
    const empty = document.getElementById('empty-cart');
    const btnCheckOut = document.getElementById('checkOut')
    // Detecta cada que se presiona el boton de "+" y incrementa el contador
    productContainer.addEventListener('click', e => {
        empty.style = "display: none";
        if (e.target.tagName == "BUTTON") { // Verifico que el elemento presionado sea un boton '+'.
            items.forEach(item => {
                if (item.id == e.target.attributes.id.value) {
                    if (item.quantity > 0 ) {
                        let index = selected.indexOf(item)
                        if (index !== -1) {
                            if(item.quantity < selected[index].unity){
                                alert("No hay stock")
                            }else{
                                selected[index].unity++
                            }
                        } else {
                            item.unity = 1;
                            insideItems++
                            selected.push(item)
                        }
                    }
                }
                if(item.unity && item.quantity > item.unity - 1){
                    loadCartProducts(item)
                }
            })
            counter.innerHTML = `${insideItems}`;
        }
    })
}

// { id, name, price, image, category, quantity, unity }
const loadCartProducts = ({ id, name, price, image, category, quantity, unity }) => {
    const listCartItems = document.getElementById('itemsToBuy')
    const itemsToBuy = document.querySelectorAll('.cart__item')

    itemsToBuy.forEach(item => {
        if (item.attributes.id.value == id)  item.remove();
    })

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart__item");
        cartItem.setAttribute('id', `${id}`)
        subTotal = price * unity;
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
                        <span class="item__unities"> ${unity} Units</span>
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