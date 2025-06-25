import { menuList } from "./data/menu.js";

const menuListContainer = document.getElementById('menu-list')
const orderListContainer = document.getElementById('order-list')
const orderSection = document.getElementById('order-section')
const orderTotalContainer = document.getElementById('order-total')
const modalContainer = document.getElementById('modal')

let orderedItems = []

document.addEventListener('click', function(e) {
    if (e.target.dataset.addItem) {
        const itemToAdd = menuList.find((item) => item.id === Number(e.target.dataset.addItem))
        addItem(itemToAdd)
    }

    if (e.target.id === 'complete-order-btn') {
        modalContainer.classList.toggle('hidden')
    }

    if (e.target.dataset.removeItem) {
        const itemToRemove = orderedItems.find((item) => item.id === Number(e.target.dataset.removeItem))
        removeItem(itemToRemove)
    }

    if (e.target.dataset.removeAllItems) {
        const itemToRemove = menuList.find((item) => item.id === Number(e.target.dataset.removeAllItems))
        removeAllItems(itemToRemove)
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
                <p class="item-card-price">$ ${item.price}</p>
            </div>
            <button class="item-add-btn" data-add-item="${item.id}">+</button>
            
        </li>
        `
    }).join('')
   
    menuListContainer.innerHTML = menuHTML

    if (orderedItems.length > 0) {
        orderSection.style.visibility = "visible"
    } else {
        orderSection.style.visibility = "hidden"
    }
}



function orderRender() {
    // order items
    const orderHTML = orderedItems.map((item) => {
        return `
            <li class="order-item">
                <div class="order-info">
                    <span>${item.orderCount} x</span> 
                    <span>${item.name}</span>
                </div>
                <div class="order-item-button-container">
                    <button class="order-btn order-btn-remove ${item.orderCount < 2 ? "hidden" : ""}" data-remove-item="${item.id}">-</button>
                    
                    <button class="order-btn order-btn-trash" data-remove-all-items="${item.id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <span class="item-price">$ ${item.price * item.orderCount}</span>
            </li>
        `
    }).join('')
    
    orderListContainer.innerHTML = orderHTML
    
    // order price
    const orderPrice = orderedItems.reduce((total, item) => (item.price * item.orderCount) + total, 0)
    orderTotalContainer.innerHTML = `
        <div class="total-line">
            <span>Total price:</span>
            <span class="total-price">$${orderPrice}</span>
        </div>
    `
    
    render()
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

function removeItem(itemFromOrder) {
    const existingOrderItem = orderedItems.find((item) => item.id === itemFromOrder.id)

    if (existingOrderItem) {
        existingOrderItem.orderCount--
    }

    if (existingOrderItem.orderCount <= 0) {
        orderedItems = orderedItems.filter((item) => item.id != itemFromOrder.id)
    }
    
    orderRender()
}

function removeAllItems(itemFromOrder) {
    orderedItems = orderedItems.filter((item) => item.id != itemFromOrder.id)
    orderRender()
}

render()