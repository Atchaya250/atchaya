let listings = [];
let cart = [];

// Event listener for login form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login successful!');
    showSection('listing');
});

// Event listener for product listing form submission
document.getElementById('listingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        listings.push({
            productName,
            productCategory,
            productPrice,
            productDescription,
            productImage: event.target.result,
        });

        document.getElementById('listingForm').reset();
        displayListings();
    };
    reader.readAsDataURL(productImage);
});

// Function to display product listings
function displayListings() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    listings.forEach((listing) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${listing.productName}</h3>
            <img src="${listing.productImage}" alt="${listing.productName}" width="100">
            <p><strong>Category:</strong> ${listing.productCategory}</p>
            <p><strong>Price:</strong> $${listing.productPrice}</p>
            <p>${listing.productDescription}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        productCard.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            addToCart(listing);
            alert('Item added to cart');
        });

        productList.appendChild(productCard);
    });
}

// Function to add an item to the cart
function addToCart(product) {
    const cartItem = cart.find(item => item.productName === product.productName);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

// Function to display cart items with increment and decrement functionality
function displayCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.productName}</h3>
            <img src="${item.productImage}" alt="${item.productName}" width="100">
            <p><strong>Price:</strong> $${item.productPrice}</p>
            <p><strong>Quantity:</strong> 
                <button class="quantity-btn" onclick="updateQuantity(${index}, 'decrement')">-</button>
                ${item.quantity}
                <button class="quantity-btn" onclick="updateQuantity(${index}, 'increment')">+</button>
            </p>
            <p><strong>Total:</strong> $${item.productPrice * item.quantity}</p>
        `;
        cartList.appendChild(cartItem);
    });
}

// Function to update the quantity of items in the cart
function updateQuantity(index, action) {
    if (action === 'increment') {
        cart[index].quantity += 1;
    } else if (action === 'decrement' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    displayCart();
}

// Event listener for Proceed to Checkout button
document.getElementById('proceedToCheckout').addEventListener('click', function() {
    showSection('order');
});
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orderName = document.getElementById('customerName').value;
    const orderAddress = document.getElementById('customerAddress').value;
    const orderPhone = document.getElementById('customerPhone').value;
    const paymentMode = document.getElementById('paymentMode').value; // Capture selected payment mode

    // Confirm order details with payment mode
    alert(`Order placed for ${orderName}\nAddress: ${orderAddress}\nPhone: ${orderPhone}\nPayment Mode: ${paymentMode}`);
    
    // Reset the form after submission
    document.getElementById('orderForm').reset();

    // Optionally, navigate to a different section or show a confirmation message on the page
    showSection('home');
});

// Function to switch between sections
function showSection(section) {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('listing-section').classList.add('hidden');
    document.getElementById('cart-section').classList.add('hidden');
    document.getElementById('order-section').classList.add('hidden');

    if (section === 'home') {
        document.getElementById('home-section').classList.remove('hidden');
    } else if (section === 'listing') {
        document.getElementById('listing-section').classList.remove('hidden');
    } else if (section === 'cart') {
        displayCart();
        document.getElementById('cart-section').classList.remove('hidden');
    } else if (section === 'order') {
        document.getElementById('order-section').classList.remove('hidden');
    }
}

// Navigation buttons to switch sections
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('listingBtn').addEventListener('click', () => showSection('listing'));
document.getElementById('cartBtn').addEventListener('click', () => showSection('cart'));
document.getElementById('orderBtn').addEventListener('click', () => showSection('order'));
