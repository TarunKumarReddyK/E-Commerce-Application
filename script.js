// Utility functions to manage localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

function getCartCount() {
    return parseInt(localStorage.getItem('cartCount')) || 0;
}

function saveCartCount(count) {
    localStorage.setItem('cartCount', count);
}

function updateCartCount() {
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.textContent = getCartCount();
    }
}

// Add to Cart functionality
function addToCart(item) {
    const cartItems = getCartItems();
    cartItems.push(item);
    saveCartItems(cartItems);

    // Update cart count
    const cartCount = getCartCount() + 1;
    saveCartCount(cartCount);
    updateCartCount();
}

// Event listener for adding items to the cart
document.addEventListener('click', (event) => {
    if (event.target.closest('.fa-shopping-cart')) {
        const itemElement = event.target.closest('.item');
        if (itemElement) {
            const item = {
                name: itemElement.querySelector('#name').textContent,
                price: parseFloat(itemElement.querySelector('#op').textContent.replace('$', '')),
                image: itemElement.querySelector('.first-image').src
            };
            addToCart(item);
        }
    }
});

// Cart page functionalities
if (document.getElementById('cart-items')) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElem = document.getElementById('total-amount');

    function renderCart() {
        const cartItems = getCartItems();
        cartItemsContainer.innerHTML = '';

        let totalAmount = 0;

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            totalAmount += item.price;
        });

        totalAmountElem.textContent = totalAmount.toFixed(2);
    }

    function handleItemRemoval(index) {
        const cartItems = getCartItems();
        cartItems.splice(index, 1);
        saveCartItems(cartItems);

        // Update cart count in header
        const newCartCount = getCartCount() - 1;
        saveCartCount(newCartCount);
        updateCartCount();

        renderCart();
    }

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            handleItemRemoval(index);
        }
    });

    renderCart();
    updateCartCount();
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});