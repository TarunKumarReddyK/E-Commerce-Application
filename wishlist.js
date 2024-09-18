// Utility functions to manage localStorage for Cart and Wishlist
function getItems(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveItems(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

function getCount(key) {
    return parseInt(localStorage.getItem(`${key}Count`)) || 0;
}

function saveCount(key, count) {
    localStorage.setItem(`${key}Count`, count);
}

function updateCountDisplay(key) {
    const countElem = document.getElementById(`${key}-count`);
    if (countElem) {
        countElem.textContent = getCount(key);
    }
}

// Add to Cart functionality
function addToCart(item) {
    const cartItems = getItems('cartItems');
    cartItems.push(item);
    saveItems('cartItems', cartItems);

    const cartCount = getCount('cart') + 1;
    saveCount('cart', cartCount);
    updateCountDisplay('cart');
}

// Add to Wishlist functionality
function addToWishlist(item) {
    const wishlistItems = getItems('wishlistItems');
    wishlistItems.push(item);
    saveItems('wishlistItems', wishlistItems);

    const wishlistCount = getCount('wishlist') + 1;
    saveCount('wishlist', wishlistCount);
    updateCountDisplay('wishlist');
}

// Event listener for adding items to cart or wishlist
document.addEventListener('click', (event) => {
    if (event.target.closest('.cart-btn')) {
        const itemElement = event.target.closest('.item');
        if (itemElement) {
            const item = {
                name: itemElement.querySelector('#name').textContent,
                price: parseFloat(itemElement.querySelector('#op').textContent.replace('$', '')),
                image: itemElement.querySelector('.first-image').src
            };
            addToCart(item);
        }
    } else if (event.target.closest('.wishlist-btn')) {
        const itemElement = event.target.closest('.item');
        if (itemElement) {
            const item = {
                name: itemElement.querySelector('#name').textContent,
                price: parseFloat(itemElement.querySelector('#op').textContent.replace('$', '')),
                image: itemElement.querySelector('.first-image').src
            };
            addToWishlist(item);
            window.location.href = 'wishlist.html'; // Redirect to Wishlist page
        }
    }
});

// Initialize counts on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCountDisplay('cart');
    updateCountDisplay('wishlist');
});