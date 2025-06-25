import { menuList } from "./data/menu.js";

const menuListContainer = document.getElementById('menu-list')
const orderListContainer = document.getElementById('order-list')
const orderTotalContainer = document.getElementById('order-total')

document.addEventListener('click', function(e) {
    if (e.target.dataset.addItem) {
        const itemToAdd = menuList.filter((item) => item.id === Number(e.target.dataset.addItem))
        addItem(itemToAdd[0])
    }
})

function render() {

    // menu render from data
    const menuHTML = menuList.map((item) => {
        return `
        <li class="item-card">
            <div class="item-image-container">
                <span>${item.emoji}</span>
            </div>
            <div class="item-description-container">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-ingredients">${item.ingredients.join(', ')}</p>
                <p class="item-price">${item.price}</p>
            </div>
            <button class="item-add-btn" id="item-add-btn" data-add-item="${item.id}">+</button>
        </li>
        `
    }).join('')

    menuListContainer.innerHTML = menuHTML
}

const orderedItems = []

function orderRender() {
    // order items
    const orderHTML = orderedItems.map((item) => {
        return `
            <li class="order-item">
                <span>${item.orderCount} x</span> 
                <span>${item.name}</span>
                <button data-remove="${item.id}">remove</button>
                <span>${item.price * item.orderCount}</span>
            </li>
        `
    }).join('')
    
    orderListContainer.innerHTML = orderHTML
    
    // order price
    const orderPrice = orderedItems.reduce((total, item) => (item.price * item.orderCount) + total, 0)
    orderTotalContainer.innerHTML = `
        <hr>
        <div class="total-line">
            <span>Total price:</span>
            <span>$${orderPrice}</span>
        </div>
    `
    console.log(orderPrice)
}

function addItem(itemFromMenu) {
    const existingOrderItem = orderedItems.find(orderedItem => orderedItem.id === itemFromMenu.id)

    if (existingOrderItem) {
        existingOrderItem.orderCount++
    } else {
        const newItemForOrder = {
            ...itemFromMenu,
            orderCount: 1
        }
        orderedItems.push(newItemForOrder)
    }

    orderRender()
}

render()