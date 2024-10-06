let cart = {};
let totalPrice = 0;

// Sample menus for each restaurant with prices in Indian Rupees
const menus = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: 900, img: "pizza.jpg" },
        { name: "Pepperoni Pizza", price: 1200, img: "pizza2.jpg" },
        { name: "Vegetable Pizza", price: 800, img: "pizza3.jpg" }
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: 800, img: "burger.jpg" },
        { name: "Veggie Burger", price: 600, img: "burger2.jpg" },
        { name: "Bacon Burger", price: 900, img: "burger3.jpg" }
    ],
    "Pasta House": [
        { name: "Spaghetti Bolognese", price: 1200, img: "https://images.app.goo.gl/nFZxcw2UyedGKXsW9" },
        { name: "Penne Alfredo", price: 900, img: "pasta2.jpg" },
        { name: "Fettuccine Carbonara", price: 1000, img: "pasta3.jpg" }
    ]
};

function loadMenu() {
    const restaurant = document.getElementById('restaurants').value;
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';

    if (restaurant) {
        menus[restaurant].forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.className = 'menu-item';
            menuItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            `;
            menuDiv.appendChild(menuItemDiv);
        });
    }
}

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
        li.textContent = `${dishName} - ${item.quantity} x ₹${item.price}`;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById('totalPrice').textContent = `Total: ₹${totalPrice}`;
}

function checkout() {
    if (Object.keys(cart).length > 0) {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('orderConfirmation').style.display = 'block';
    } else {
        alert('Your cart is empty!');
    }
}

function confirmOrder() {
    alert('Your order has been confirmed!');
    cart = {};
    updateCart();
    document.getElementById('cart').style.display = 'block';
    document.getElementById('orderConfirmation').style.display = 'none';
}