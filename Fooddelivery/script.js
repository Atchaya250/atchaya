let cart = {};
let totalPrice = 0;

// Sample menus for each restaurant with descriptions and ratings
const menus = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: 120, img: "pizza.jpg", description: "Classic pizza with mozzarella and basil.", rating: 4.5 },
        { name: "Pepperoni Pizza", price: 150, img: "pizza2.jpg", description: "Spicy pepperoni slices on a cheesy base.", rating: 4.7 },
        { name: "Vegetable Pizza", price: 100, img: "pizza3.jpg", description: "Fresh vegetables on a tomato base.", rating: 4.3 },
        { name: "BBQ Chicken Pizza", price: 180, img: "pizza4.jpg", description: "BBQ chicken with red onions and cilantro.", rating: 4.8 },
        { name: "Four Cheese Pizza", price: 200, img: "pizza5.jpg", description: "A blend of four delicious cheeses.", rating: 4.6 },
        { name: "Hawaiian Pizza", price: 160, img: "pizza6.jpg", description: "Topped with ham and pineapple.", rating: 4.4 }
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: 100, img: "burger.jpg", description: "Juicy beef patty with cheddar cheese.", rating: 4.4 },
        { name: "Veggie Burger", price: 80, img: "burger2.jpg", description: "Delicious plant-based burger.", rating: 4.2 },
        { name: "Bacon Burger", price: 120, img: "burger3.jpg", description: "Loaded with crispy bacon and cheese.", rating: 4.6 },
        { name: "Spicy Chicken Burger", price: 110, img: "burger4.jpg", description: "Crispy chicken with spicy mayo.", rating: 4.5 },
        { name: "BBQ Burger", price: 130, img: "burger5.jpg", description: "BBQ sauce with onion rings.", rating: 4.3 },
        { name: "Mushroom Swiss Burger", price: 140, img: "burger6.jpg", description: "Mushrooms and Swiss cheese.", rating: 4.4 }
    ],
    "Pasta House": [
        { name: "Spaghetti Bolognese", price: 140, img: "pasta1.jpg", description: "Traditional Italian spaghetti with meat sauce.", rating: 4.8 },
        { name: "Penne Alfredo", price: 120, img: "pasta2.jpg", description: "Creamy Alfredo sauce with penne pasta.", rating: 4.5 },
        { name: "Fettuccine Carbonara", price: 130, img: "pasta3.jpg", description: "Classic carbonara with pancetta.", rating: 4.6 },
        { name: "Lasagna", price: 160, img: "pasta4.jpg", description: "Layers of pasta with meat and cheese.", rating: 4.7 },
        { name: "Pesto Pasta", price: 150, img: "pasta5.jpg", description: "Pasta tossed in fresh basil pesto.", rating: 4.6 },
        { name: "Pasta Primavera", price: 140, img: "pasta6.jpg", description: "Pasta with fresh seasonal vegetables.", rating: 4.5 }
    ],
    "Dosa House": [
        { name: "Masala Dosa", price: 70, img: "dosa1.jpg", description: "Crispy dosa filled with spicy potato mix.", rating: 4.4 },
        { name: "Plain Dosa", price: 50, img: "dosa2.jpg", description: "Simple and crispy dosa served with chutney.", rating: 4.1 },
        { name: "Onion Dosa", price: 80, img: "dosa3.jpg", description: "Dosa topped with sautéed onions.", rating: 4.3 },
        { name: "Rawa Dosa", price: 60, img: "dosa4.jpg", description: "Crispy dosa made from semolina.", rating: 4.5 },
        { name: "Cheese Dosa", price: 90, img: "dosa5.jpg", description: "Filled with melted cheese and served hot.", rating: 4.6 },
        { name: "Set Dosa", price: 75, img: "dosa6.jpg", description: "Thick and soft dosa served in sets.", rating: 4.2 }
    ],
    "Biryani Hub": [
        { name: "Chicken Biryani", price: 200, img: "briyani1.jpg", description: "Aromatic rice with tender chicken pieces.", rating: 4.7 },
        { name: "Veg Biryani", price: 150, img: "briyani2.jpg", description: "Spiced rice with mixed vegetables.", rating: 4.3 },
        { name: "Mutton Biryani", price: 250, img: "briyani3.jpg", description: "Flavorful biryani made with mutton.", rating: 4.9 },
        { name: "Egg Biryani", price: 180, img: "briyani4.jpg", description: "Biryani with boiled eggs and spices.", rating: 4.5
    },
        { name: "Hyderabadi Biryani", price: 300, img: "briyani5.jpg", description: "Authentic Hyderabadi biryani with rich flavors.", rating: 4.8 },
        { name: "Paneer Biryani", price: 160, img: "briyani6.jpg", description: "Biryani with paneer cubes and spices.", rating: 4.4 }
    ]
};

// Display Home Content
function showHome() {
    document.getElementById("homeContent").style.display = "block";
    document.getElementById("menu").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("orderConfirmation").style.display = "none";
    document.getElementById("breadcrumbs").innerText = "Home";
}

// Display Menu
function showRestaurant() {
    document.getElementById("homeContent").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("orderConfirmation").style.display = "none";
    loadRestaurantMenu();
    document.getElementById("breadcrumbs").innerText = "Restaurant";
}

// Load the selected restaurant menu
function loadSelectedRestaurantMenu() {
    const selectedRestaurant = document.getElementById("restaurantSelect").value;
    const dishesDiv = document.getElementById("restaurantDishes");
    dishesDiv.innerHTML = ""; // Clear previous dishes

    if (selectedRestaurant) {
        const restaurantMenu = menus[selectedRestaurant];

        restaurantMenu.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "menu-item";
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h4>${item.name} - ₹${item.price}</h4>
                <p>${item.description}</p>
                <p>Rating: ${item.rating} ⭐</p>
                <button onclick="addToCart('${selectedRestaurant}', '${item.name}', ${item.price})">Add to Cart</button>
            `;
            dishesDiv.appendChild(itemDiv);
        });
    }
}

// Show Restaurant Page
function showRestaurant() {
    document.getElementById("homeContent").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("orderConfirmation").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("restaurantDishes").innerHTML = ""; // Clear previous dishes
    document.getElementById("breadcrumbs").innerText = "Restaurant";
}

// Add to Cart
function addToCart(restaurant, foodName, price) {
    if (!cart[foodName]) {
        cart[foodName] = { restaurant, price, quantity: 0 };
    }
    cart[foodName].quantity++;
    totalPrice += price;

    updateCart();
}

// Update Cart Display
function updateCart() {
    const cartItemsList = document.getElementById("cartItems");
    cartItemsList.innerHTML = ""; // Clear previous items

    for (const foodName in cart) {
        const item = cart[foodName];
        const listItem = document.createElement("li");
        listItem.innerText = `${foodName} (x${item.quantity}) - ₹${item.price}`;
        cartItemsList.appendChild(listItem);
    }
    
    document.getElementById("totalPrice").innerText = `Total Price: ₹${totalPrice}`;
}

// Show Cart
function showCart() {
    if(Object.keys(cart).length===0){
        alert("Your cart is empty!");
    }else{
    document.getElementById("homeContent").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("orderConfirmation").style.display = "none";
    document.getElementById("cart").style.display = "block";
    document.getElementById("breadcrumbs").innerText = "Cart";
}
}    

// Checkout Process
function checkout() {
    showOrder();
}

// Show Order Confirmation
function showOrder() {
    document.getElementById("homeContent").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("orderConfirmation").style.display = "block";

    let orderDetails = "Your order has been placed for:\n";
    for (const foodName in cart) {
        const item = cart[foodName];
        orderDetails += `${item.quantity} x ${foodName} from ${item.restaurant}\n`;
    }
    orderDetails += `Total Price: ₹${totalPrice}`;
    document.getElementById("orderDetails").innerText = orderDetails;
}

// Confirm Order
function confirmOrder() {
    alert("Your order has been confirmed!");
    // Reset cart and total price
    cart = {};
    totalPrice = 0;
    updateCart();
    showHome();
}
