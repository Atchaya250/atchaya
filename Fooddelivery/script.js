let cart = {};
let totalPrice = 0;

function addToCart(dishName, price) {
    if (cart[dishName]) {
        cart[dishName].quantity++;
    } else {
        cart[dishName] = { price, quantity: 1 };
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    totalPrice = 0;

    for (let dishName in cart) {
        const item = cart[dishName];
        const li = document.createElement('li');
        li.textContent = `${dishName} - ${item.quantity} x $${item.price}`;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById('totalPrice').textContent = totalPrice;
}

function checkout() {
    if (Object.keys(cart).length > 0) {
        // Hide the cart and show order confirmation
        document.getElementById('cart').style.display = 'none';
        document.getElementById('orderConfirmation').style.display = 'block';
    } else {
        alert('Your cart is empty!');
    }
}

function confirmOrder() {
    alert('Your order has been confirmed!');
    // Reset the cart and go back to initial state
    cart = {};
    updateCart();
    document.getElementById('cart').style.display = 'block';
    document.getElementById('orderConfirmation').style.display = 'none';
}