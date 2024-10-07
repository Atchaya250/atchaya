let cart = {};
let totalPrice = 0;

// Sample menus for each restaurant
const menus = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: 120, img: "pizza1.jpg" },
        { name: "Pepperoni Pizza", price: 150, img: "pizza2.jpg" },
        { name: "Vegetable Pizza", price: 100, img: "pizza3.jpg" }
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: 100, img: "burger1.jpg" },
        { name: "Veggie Burger", price: 80, img: "burger2.jpg" },
        { name: "Bacon Burger", price: 120, img: "burger3.jpg" }
    ],
    "Pasta House": [
        { name: "Spaghetti Bolognese", price: 140, img: "pasta1.jpg" },
        { name: "Penne Alfredo", price: 120, img: "pasta2.jpg" },
        { name: "Fettuccine Carbonara", price: 130, img: "pasta3.jpg" }
    ],
    "Dosa House": [
        { name: "Plain Dosa", price: 50, img: "dosa1.jpg" },
        { name: "Masala Dosa", price: 70, img: "dosa2.jpg" },
        { name: "Cheese Dosa", price: 90, img: "dosa3.jpg" }
    ],
    "Biryani Hub": [
        { name: "Chicken Biryani", price: 150, img: "biryani1.jpg" },
        { name: "Mutton Biryani", price: 180, img: "biryani2.jpg" },
        { name: "Veg Biryani", price: 120, img: "biryani3.jpg" }
    ],
    "Shawarma Corner": [
        { name: "Chicken Shawarma", price: 100, img: "shawarma1.jpg" },
        { name: "Beef Shawarma", price: 120, img: "shawarma2.jpg" },
        { name: "Veg Shawarma", price: 90, img: "shawarma3.jpg" }
    ]
};

function loadMenu() {
    const restaurant = document.getElementById('restaurantSelect').value;
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
                <button class="addToCartBtn" onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
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

    document.getElementById('totalPrice').textContent = totalPrice;
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