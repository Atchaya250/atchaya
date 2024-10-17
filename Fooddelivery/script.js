const cart = []; // Initialize an empty cart array

// Sample dishes for three restaurants
const dishes = [
    // Restaurant 1 Dishes
    [
        { name: 'Margherita Pizza', description: 'Classic pizza with mozzarella and basil.', price: 500, rating: 4.5, img: 'pizza1.jpg' },
        { name: 'Pepperoni Pizza', description: 'Spicy Pepperoni slices on a cheesy base', price: 400, rating: 4.6, img: 'pizza2.jpg' },
        { name: 'Vegetable Pizza', description: 'Fresh Vegetable on a tomato base.', price: 300, rating: 4.2, img: 'pizza3.jpg' },
        { name: 'BBQ Chicken Pizza', description: 'BBQ Chicken with red onions and cilantro', price: 150, rating: 4.0, img: 'pizza4.jpg' },
        { name: 'Four Cheese Pizza', description: 'A blend of four delicious cheeses', price: 250, rating: 4.7, img: 'pizza5.jpg' },
        { name: 'Hawaiian Pizza', description: 'Topped with ham and pineapple', price: 100, rating: 4.3, img: 'pizza6.jpg' }
    ],
    // Restaurant 2 Dishes
    [
        { name: 'Sushi Platter', description: 'Assorted Sushi', price: 600, rating: 4.8, img: 'dish7.jpg' },
        { name: 'Ramen', description: 'Spicy Ramen Bowl', price: 350, rating: 4.4, img: 'dish8.jpg' },
        { name: 'Spring Rolls', description: 'Crispy Spring Rolls', price: 120, rating: 4.1, img: 'dish9.jpg' },
        { name: 'Curry', description: 'Spicy Chicken Curry', price: 350, rating: 4.9, img: 'dish10.jpg' },
        { name: 'Dessert', description: 'Chocolate Mousse', price: 150, rating: 4.7, img: 'dish11.jpg' }
    ],
    // Restaurant 3 Dishes
    [
        { name: 'Steak', description: 'Grilled Steak', price: 700, rating: 4.8, img: 'dish12.jpg' },
        { name: 'Seafood', description: 'Mixed Seafood Platter', price: 800, rating: 4.9, img: 'dish13.jpg' },
        { name: 'Sandwich', description: 'Club Sandwich', price: 250, rating: 4.3, img: 'dish14.jpg' },
        { name: 'Coffee', description: 'Espresso Coffee', price: 100, rating: 4.6, img: 'dish15.jpg' },
        { name: 'Ice Cream', description: 'Vanilla Ice Cream', price: 90, rating: 4.5, img: 'dish16.jpg' },
        { name: 'Pancakes', description: 'Fluffy Pancakes', price: 200, rating: 4.4, img: 'dish17.jpg' }
    ]
];

// Function to navigate between sections
function navigateTo(section) {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('restaurant-section').style.display = 'none';
    document.getElementById('menu-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('delivery-info-section').style.display = 'none';

    if (section === 'home') {
        document.getElementById('home-section').style.display = 'block';
    } else if (section === 'restaurant') {
        document.getElementById('restaurant-section').style.display = 'block';
    } else if (section === 'menu') {
        document.getElementById('menu-section').style.display = 'block';
    } else if (section === 'cart') {
        displayCartItems();
        document.getElementById('cart-section').style.display = 'block';
    } else if (section === 'orderPlaced') {
        document.getElementById('delivery-info-section').style.display = 'block';
    }
}

// Function to view menu
function viewMenu(restaurantIndex) {
    const menuContainer = document.querySelector('.menu-items-container');
    menuContainer.innerHTML = ''; // Clear previous menu items

    dishes[restaurantIndex].forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.classList.add('menu-item');

        dishDiv.innerHTML = `
            <img src="${dish.img}" alt="${dish.name}" class="dish-img">
            <h4>${dish.name}</h4>
            <p>Description: ${dish.description}</p>
            <p>Price: ₹${dish.price}</p>
            <p>Rating: ${dish.rating}/5</p>
            <button class="add-to-cart-btn" onclick="addToCart('${dish.name}', '${dish.description}', ${dish.price}, ${dish.rating}, '${dish.img}')">Add to Cart</button>
        `;

        menuContainer.appendChild(dishDiv);
    });

    navigateTo('menu');
}

// Function to add item to cart and navigate to the cart page
function addToCart(name, description, price, rating, img) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, description, price, rating, img, quantity: 1 });
    }
    navigateTo('cart'); // Navigate to cart page after adding the item
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        itemDiv.innerHTML = `
            <div class="cart-item-content">
                <img src="${item.img}" alt="${item.name}" class="cart-dish-img">
                <div>
                    <h4>${item.name}</h4>
                    <p>Description: ${item.description}</p>
                    <p>Price: ₹${item.price}</p>
                    <p>Rating: ${item.rating}/5</p>
                    <div class="quantity-control">
                        <button onclick="changeQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    const totalDiv = document.getElementById('total-price');
    totalDiv.innerHTML = `<strong>Total Price: ₹${totalPrice}</strong>`;
}

// Function to change item quantity in cart
function changeQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart.splice(cart.indexOf(item), 1);
        }
        displayCartItems();
    }
}

// Function to proceed to checkout and navigate to the order page
function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to the cart before proceeding to checkout.");
        return;
    }
    navigateTo('orderPlaced');
}

// Function to confirm order
function confirmOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment').value;

    // Here you can handle the order confirmation logic, like sending the order details to a server.

    alert(`Order Confirmed!\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nPayment Method: ${payment}`);
    // Reset cart and navigate to home
    cart.length = 0; 
    navigateTo('home');
}

// Initially navigate to the home section
navigateTo('home');