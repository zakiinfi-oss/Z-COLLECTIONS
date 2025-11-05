let cart = [];
let total = 0;

// Google Sign-In
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());
    alert(`Welcome, ${profile.getName()}! You are logged in with Google.`);
    document.getElementById('logout-btn').style.display = 'inline-block';
    // In a real app, send token to server for verification
}

document.getElementById('logout-btn').addEventListener('click', () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        alert('Logged out.');
        document.getElementById('logout-btn').style.display = 'none';
    });
});

// Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);

        cart.push({ id, name, price });
        total += price;
        updateCart();
        alert(`${name} added to cart!`);
    });
});

function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
    document.getElementById('cart').style.display = cart.length > 0 ? 'block' : 'none';
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Checkout total: $${total.toFixed(2)}. (Demo only—integrate Stripe for real payments.)`);
    }
});

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    total = 0;
    updateCart();
});
