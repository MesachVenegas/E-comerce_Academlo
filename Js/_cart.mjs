// Variables de control de items en carrito.
const counter = document.getElementById('cart-counter')
const totalItems = document.getElementById('total-items')
const totalToPay = document.getElementById('to-pay')
const empty = document.getElementById('empty-cart');
const btnCheckOut = document.getElementById('checkOut')
let selected = [];
let subTotal = 0;
let total = 0;
let insideItems = 0;


export const addProduct = (items) => {
    const productContainer = document.querySelector('.products__container')
    // Detecta cada que se presiona el boton de "+" y incrementa el contador
    productContainer.addEventListener('click', e => {
        empty.style = "display: none";
        if (e.target.tagName == "BUTTON") { // Verifico que el elemento presionado sea un boton '+'.
            items.forEach(item => {
                if (item.id == e.target.attributes.id.value) {
                    if (item.quantity > 0 ) {
                        let index = selected.indexOf(item)
                        if (index !== -1) {
                            selected[index].unity++;
                            if(item.unity <= item.quantity){
                                insideItems++
                                total += item.price;
                            }else{
                                alert("We don't have any more, sorry...")
                            }
                        } else {
                            item.unity = 1;
                            insideItems++
                            total += item.price
                            selected.push(item)
                        }
                    }
                }
                if(item.unity && item.quantity > item.unity - 1){
                    loadCartProducts(item)
                }
            })
            addRestCartItem()
            counter.innerHTML = `${insideItems}`;
            totalItems.innerHTML = `${insideItems} items`;
            totalToPay.innerHTML = `$${total.toFixed(2)}`
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
            <p class="item__subtotal" id='subtotal-${id}'>
                Subtotal: $${subTotal.toFixed(2)}
            </p>
            <div class="item__menu">
                <div class="item__btns">
                    <button class="item__btn" id="less-${id}">-</button>
                    <span class="item__unities" id="unity-${id}"> ${unity} Units</span>
                    <button class="item__btn" id="add-${id}">+</button>
                </div>
                <span class="item__trash__btn" id="trash-item">
                    <i class="fa-solid fa-trash" id='trash-${id}'></i>
                </span>
            </div>
        </div>
        `
    listCartItems.appendChild(cartItem)
}

const addRestCartItem = () =>{
    const itemsCard = document.querySelectorAll('.cart__item')
    itemsCard.forEach(itemCard => {
        itemCard.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                selected.forEach(item => {
                    const subTotalItems = document.getElementById(`subtotal-${item.id}`)
                    const unityItem = document.getElementById(`unity-${item.id}`)
                    if (e.target.id == `add-${item.id}`) {
                        if (item.quantity > item.unity){
                            item.unity++
                            insideItems++
                            subTotal = item.price * item.unity;
                            total += item.price;
                            counter.innerHTML = `${insideItems}`;
                            unityItem.innerHTML = `${item.unity} Units`
                            subTotalItems.innerHTML =`Subtotal: $${subTotal.toFixed(2)}`
                            totalItems.innerHTML = `${insideItems} items`;
                            totalToPay.innerHTML = `$${total.toFixed(2)}`
                        }else{
                            alert("We don't have any more, sorry...")
                        }
                    }else if(e.target.id == `less-${item.id}`) {
                        if (item.unity > 1){
                            item.unity--
                            insideItems--
                            subTotal = item.price * item.unity;
                            total -= item.price;
                            counter.innerHTML = `${insideItems}`;
                            unityItem.innerHTML = `${item.unity} Units`
                            subTotalItems.innerHTML = `Subtotal: $${subTotal.toFixed(2)}`
                            totalItems.innerHTML = `${insideItems} items`;
                            totalToPay.innerHTML = `$${total.toFixed(2)}`
                        }
                        else {
                            let answer = confirm("Want delete item?")
                            if(answer){
                                deleteCartItem(item, itemsCard)
                            }
                        }
                    }
                })
            }
            selected.forEach(item => {
                if (e.target.tagName === 'I') {
                    if(e.target.id == `trash-${item.id}`){
                        // console.log(e.target.id);
                        deleteCartItem(item, itemsCard)
                    }
                }
            })
        })
    })
}

const deleteCartItem = (item= undefined, itemsCard) =>{
    let indexItem;
    const itemsToBuy = document.querySelectorAll('.cart__item')
    const subTotalItems = document.getElementById(`subtotal-${item.id}`)
    const unityItem = document.getElementById(`unity-${item.id}`)
    // if (item.id == id) item.remove();
    selected.forEach(select =>{
            // console.log(item.id, id);
            if(select.id === item.id){
                itemsToBuy.forEach(itemToBuy => {
                    if(item.id == itemToBuy.id){
                        indexItem = selected.indexOf(item)
                        item.unity = 0;
                        insideItems--
                        subTotal = item.price * item.unity;
                        total -= item.price;
                        counter.innerHTML = `${insideItems}`;
                        unityItem.innerHTML = `${item.unity} Units`
                        subTotalItems.innerHTML = `Subtotal: $${subTotal.toFixed(2)}`
                        totalItems.innerHTML = `${insideItems} items`;
                        totalToPay.innerHTML = `$${total.toFixed(2)}`
                        itemToBuy.remove()
                    }
                })
            }
        })
        let  bolean= 0;
        selected[indexItem] = item;
        const displayBg =  selected.map(select => {
                if(select.unity == 0){
                    return   0;
                }else{
                    return  1;
                }
            })
        displayBg.forEach(item =>{
            bolean += item;
        })
        if(bolean === 0){
            insideItems, subTotal, total = 0;
            counter.innerHTML = `${insideItems}`;
            subTotalItems.innerHTML = `Subtotal: $${subTotal.toFixed(2)}`
            totalItems.innerHTML = `${insideItems} items`;
            totalToPay.innerHTML = `$${total.toFixed(2)}`
            empty.style = "display: static";
        }
    }