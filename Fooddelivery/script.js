let cart = [];
let itemQuantity = 1;

function goHome() {
    hideAllSections();
    document.getElementById('home-section').style.display = 'block';
}

function selectRestaurant() {
    hideAllSections();
    document.getElementById('restaurant-section').style.display = 'block';
}

function viewMenu(restaurant) {
    hideAllSections();
    document.getElementById('menu-section').style.display = 'block';
    document.getElementById('restaurant-name').innerText = `${restaurant} Menu`;
}

function hideAllSections() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('restaurant-section').style.display = 'none';
    document.getElementById('menu-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('delivery-info-section').style.display = 'none';
}

function addToCart(dish, price) {
    const item = {
        name: dish,
        price: price,
        quantity: itemQuantity
    };
    cart.push(item);
    alert(`${dish} added to cart!`);
}

function increaseQuantity() {
    itemQuantity++;
    document.getElementById('item-quantity').textContent = itemQuantity;
}

function decreaseQuantity() {
    if (itemQuantity > 1) {
        itemQuantity--;
        document.getElementById('item-quantity').textContent = itemQuantity;
    }
}

function viewCart() {
    hideAllSections();
    document.getElementById('cart-section').style.display = 'block';
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ""; // Clear previous items

    cart.forEach((item, index) => {
const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsDiv.appendChild(cartItem);
    });

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function proceedToCheckout() {
    hideAllSections();
    document.getElementById('delivery-info-section').style.display = 'block';
}

function confirmOrder(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment').value;

    if (name && address && phone) {
        alert(`Order confirmed!\n\nCustomer Name: ${name}\nAddress: ${address}\nPhone: ${phone}\nPayment Mode: ${payment}`);
        clearCart();
        goHome(); // Return to the home page after placing order
    } else {
        alert("Please fill out all delivery information.");
    }
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}