let cart = {};
let totalPrice = 0;

const restaurants = {
    "Pizza Place": {
        img: "pizza-place.jpg",
        address: "123 Pizza Street",
        deliveryTime: "30 mins",
        menu: [
            { name: "Margherita Pizza", price: 120, img: "pizza1.jpg", rating: 4.5, description: "Classic pizza with cheese and tomato." },
            { name: "Pepperoni Pizza", price: 150, img: "pizza2.jpg", rating: 4.7, description: "Topped with pepperoni and cheese." },
            { name: "Vegetable Pizza", price: 100, img: "pizza3.jpg", rating: 4.3, description: "Fresh vegetables with mozzarella." }
        ]
    },
    "Burger Joint": {
        img: "burger-joint.jpg",
        address: "456 Burger Lane",
        deliveryTime: "20 mins",
        menu: [
            { name: "Cheeseburger", price: 100, img: "burger1.jpg", rating: 4.4, description: "Juicy beef patty with cheese." },
            { name: "Veggie Burger", price: 80, img: "burger2.jpg", rating: 4.2, description: "Delicious veggie patty." },
            { name: "Bacon Burger", price: 120, img: "burger3.jpg", rating: 4.6, description: "Crispy bacon with beef patty." }
        ]
    },
    "Pasta House": {
        img: "pasta-house.jpg",
        address: "789 Pasta Avenue",
        deliveryTime: "40 mins",
        menu: [
            { name: "Spaghetti Bolognese", price: 140, img: "pasta1.jpg", rating: 4.8, description: "Rich meat sauce with spaghetti." },
            { name: "Penne Alfredo", price: 120, img: "pasta2.jpg", rating: 4.5, description: "Creamy Alfredo sauce with penne." },
            { name: "Fettuccine Carbonara", price: 130, img: "pasta3.jpg", rating: 4.6, description: "Egg, cheese, and pancetta sauce." }
        ]
    }
};

function showRestaurants() {
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('restaurantSection').style.display = 'block';
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';
    for (let restaurant in restaurants) {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.className = 'restaurant';
        restaurantDiv.innerHTML = `
            <img src="${restaurants[restaurant].img}" alt="${restaurant}">
            <h3>${restaurant}</h3>
            <p>${restaurants[restaurant].address}</p>
            <p>Delivery Time: ${restaurants[restaurant].deliveryTime}</p>
            <button onclick="showMenu('${restaurant}')">View Menu</button>
        `;
        restaurantList.appendChild(restaurantDiv);
    }
}

function showMenu(restaurant) {
    document.getElementById('restaurantSection').style.display = 'none';
    document.getElementById('menuSection').style.display = 'block';
    const restaurantDetails = document.getElementById('restaurantDetails');
    restaurantDetails.innerHTML = `
        <img src="${restaurants[restaurant].img}" alt="${restaurant}">
        <h3>${restaurant}</h3>
        <p>${restaurants[restaurant].address}</p>
        <p>Delivery Time: ${restaurants[restaurant].deliveryTime}</p>
    `;
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';
    restaurants[restaurant].menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
    
        menuItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Price: ₹${item.price}</p>
            <p>Rating: ${item.rating}⭐</p>
            <p>${item.description}</p>
            <button onclick="addToCart('${restaurant}', '${item.name}', ${item.price})">Add to Cart</button>
        `;
        menuList.appendChild(menuItem);
    });
}

function addToCart(restaurant, itemName, itemPrice) {
    if (!cart[restaurant]) {
        cart[restaurant] = {};
    }
    if (!cart[restaurant][itemName]) {
        cart[restaurant][itemName] = { price: itemPrice, quantity: 0 };
    }
    cart[restaurant][itemName].quantity++;
    totalPrice += itemPrice;
    alert(`${itemName} added to cart!`);
}

function showCart() {
    document.getElementById('menuSection').style.display = 'none';
    document.getElementById('cartSection').style.display = 'block';
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    for (let restaurant in cart) {
        for (let itemName in cart[restaurant]) {
            const item = cart[restaurant][itemName];
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${itemName} (${restaurant}) - ₹${item.price} x ${item.quantity}</span>
                <button onclick="increaseItem('${restaurant}', '${itemName}')">+</button>
                <button onclick="decreaseItem('${restaurant}', '${itemName}')">-</button>
            `;
            cartItems.appendChild(cartItem);
        }
    }
    document.getElementById('totalPrice').innerText = totalPrice;
}

function increaseItem(restaurant, itemName) {
    cart[restaurant][itemName].quantity++;
    totalPrice += cart[restaurant][itemName].price;
    showCart();
}

function decreaseItem(restaurant, itemName) {
    if (cart[restaurant][itemName].quantity > 0) {
        cart[restaurant][itemName].quantity--;
        totalPrice -= cart[restaurant][itemName].price;
        if (cart[restaurant][itemName].quantity === 0) {
            delete cart[restaurant][itemName];
        }
    }
    showCart();
}

function checkout() {
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('checkoutSection').style.display = 'block';
}

function confirmOrder() {
    event.preventDefault();
    alert("Order placed successfully!");
    cart = {};
    totalPrice = 0;
    document.getElementById('checkoutSection').style.display = 'none';
    document.getElementById('orderConfirmationSection').style.display = 'block';
}

function placeOrder() {
    alert("Please fill the delivery form.");
}

function showHome() {
    document.getElementById('homeSection').style.display = 'block';
    document.getElementById('restaurantSection').style.display = 'none';
    document.getElementById('menuSection').style.display = 'none';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('checkoutSection').style.display = 'none';
    document.getElementById('orderConfirmationSection').style.display = 'none';
}

function showRestaurants() {
    showHome();
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('restaurantSection').style.display = 'block';
}