function hideAllSections() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('restaurant-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('delivery-info-section').style.display = 'none';
}

function goHome() {
    hideAllSections();
    document.getElementById('home-section').style.display = 'block';
}

function showRestaurants() {
    hideAllSections();
    document.getElementById('restaurant-section').style.display = 'block';
}

function viewCart() {
    hideAllSections();
    document.getElementById('cart-section').style.display = 'block';
}

function proceedToCheckout() {
    hideAllSections();
    document.getElementById('delivery-info-section').style.display = 'block';
}

// Sample menu data for 6 restaurants
const menuData = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: "₹120", rating: "4.5", img: "pizza1.jpg" },
        { name: "Pepperoni Pizza", price: "₹150", rating: "4.7", img: "pizza2.jpg" },
        { name: "Vegetable Pizza", price: "₹100", rating: "4.3", img: "pizza3.jpg" }
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: "₹180", rating: "4.6", img: "burger1.jpg" },
        { name: "Bacon Burger", price: "₹220", rating: "4.7", img: "burger2.jpg" },
        { name: "Veggie Burger", price: "₹150", rating: "4.4", img: "burger3.jpg" }
    ],
    "Sushi Spot": [
        { name: "California Roll", price: "₹250", rating: "4.8", img: "sushi1.jpg" },
        { name: "Tuna Roll", price: "₹230", rating: "4.5", img: "sushi2.jpg" },
        { name: "Salmon Roll", price: "₹240", rating: "4.6", img: "sushi3.jpg" }
    ],
    "Pasta House": [
        { name: "Spaghetti Bolognese", price: "₹300", rating: "4.7", img: "pasta1.jpg" },
        { name: "Penne Alfredo", price: "₹280", rating: "4.5", img: "pasta2.jpg" },
        { name: "Lasagna", price: "₹320", rating: "4.8", img: "pasta3.jpg" }
    ],
    "Indian Tandoor": [
        { name: "Butter Chicken", price: "₹350", rating: "4.8", img: "indian1.jpg" },
        { name: "Paneer Tikka", price: "₹280", rating: "4.7", img: "indian2.jpg" },
        { name: "Naan & Curry", price: "₹250", rating: "4.5", img: "indian3.jpg" }
    ],
    "Mexican Grill": [
        { name: "Tacos", price: "₹200", rating: "4.6", img: "mexican1.jpg" },
        { name: "Burrito", price: "₹220", rating: "4.7", img: "mexican2.jpg" },
        { name: "Quesadilla", price: "₹180", rating: "4.5", img: "mexican3.jpg" }
    ]
};

function showRestaurantMenu() {
    const restaurant = document.getElementById('restaurant-select').value;
    const menuSection = document.getElementById('menu-section');
    menuSection.innerHTML = ''; // Clear previous content

    if (restaurant && menuData[restaurant]) {
        menuData[restaurant].forEach(dish => {
            const dishItem = `
                <div class="menu-item">
                <img src="${dish.img}" alt="${dish.name}">
                <h3>${dish.name} - ${dish.price}</h3>
                <p>Rating: ${dish.rating} ⭐</p>
                <button onclick="addToCart('${dish.name}', '${dish.price}')">Add to Cart</button>
            </div>
            `;
            menuSection.innerHTML += dishItem;
        });
    }
}

let cart = [];

function addToCart(name, price) {
    const item = cart.find(cartItem => cartItem.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartSection = document.getElementById('cart-items');
    cartSection.innerHTML = ''; // Clear previous content

    if (cart.length === 0) {
        cartSection.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = `
                <div class="cart-item">
                    <h3>${item.name} - ${item.price}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="increaseQuantity('${item.name}')">+</button>
                    <button onclick="decreaseQuantity('${item.name}')">-</button>
                </div>
            `;
            cartSection.innerHTML += cartItem;
        });
    }
}

function increaseQuantity(name) {
    const item = cart.find(cartItem => cartItem.name === name);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(name) {
    const item = cart.find(cartItem => cartItem.name === name);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(cartItem => cartItem.name !== name);
    }
    updateCart();
}

function submitOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const time = document.getElementById('time').value;
    const paymentMode = document.getElementById('payment').value;

    if (name && address && time && paymentMode) {
        alert(`Order placed successfully! \nName: ${name} \nAddress: ${address} \nDelivery Time: ${time} \nPayment Mode: ${paymentMode}`);
        cart = []; // Clear the cart
        goHome(); // Redirect to home
    } else {
        alert('Please fill in all the details.');
    }
}