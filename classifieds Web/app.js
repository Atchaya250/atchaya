let users = [];
let listings = [];

// Event listener for login form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login successful!');

    // After login, navigate to the product listing page
    showSection('listing');
});

// Event listener for product listing form submission
document.getElementById('listingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDescription = document.getElementById('productDescription').value;

    // Add the new listing to the listings array
    listings.push({ productName, productCategory, productPrice, productDescription });

    // Clear the form
    document.getElementById('listingForm').reset();

    // Display updated product listings
    displayListings();
});

// Function to display product listings (with buy button navigating to order page)
function displayListings() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    listings.forEach(listing => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${listing.productName}</h3>
            <p><strong>Category:</strong> ${listing.productCategory}</p>
            <p><strong>Price:</strong> $${listing.productPrice}</p>
            <p>${listing.productDescription}</p>
            <button class="buy-btn">Buy</button>
        `;

        // Add event listener to Buy button to navigate to order page
        productCard.querySelector('.buy-btn').addEventListener('click', function() {
            showSection('order');
        });

        productList.appendChild(productCard);
    });
}

// Function to toggle sections and breadcrumbs
function showSection(section) {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('listing-section').classList.add('hidden');
    document.getElementById('order-section').classList.add('hidden');

    document.getElementById('breadcrumb-home').classList.add('hidden');
    document.getElementById('breadcrumb-listing').classList.add('hidden');
    document.getElementById('breadcrumb-order').classList.add('hidden');

    if (section === 'home') {
        document.getElementById('home-section').classList.remove('hidden');
        document.getElementById('breadcrumb-home').classList.remove('hidden');
    } else if (section === 'listing') {
        document.getElementById('listing-section').classList.remove('hidden');
        document.getElementById('breadcrumb-home').classList.remove('hidden');
        document.getElementById('breadcrumb-listing').classList.remove('hidden');
    } else if (section === 'order') {
        document.getElementById('order-section').classList.remove('hidden');
        document.getElementById('breadcrumb-home').classList.remove('hidden');
        document.getElementById('breadcrumb-order').classList.remove('hidden');
    }
}

// Event listeners for navigation buttons
document.getElementById('homeBtn').addEventListener('click', function() {
    showSection('home');
});

document.getElementById('listingBtn').addEventListener('click', function() {
    showSection('listing');
});

document.getElementById('orderBtn').addEventListener('click', function() {
    showSection('order');
});
