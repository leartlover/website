document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');

    function updateCartTotal() {
        if (!cartTotalElement) {
            return;
        }
        const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);
        cartTotalElement.textContent = `${total} CHF`;
    }

    function renderCartItems() {
        if (!cartItemsContainer) {
            return; // If the container is not found, exit the function
        }
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="images/${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Größe: ${item.size}</p>
                    <p>Menge: ${item.quantity}</p>
                    <p>Preis: ${parseFloat(item.price).toFixed(2)} CHF</p>
                    <p>Gesamt: ${(parseFloat(item.price) * item.quantity).toFixed(2)} CHF</p>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-remove" data-index="${index}">Entfernen</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                updateCartTotal();
            });
        });

        updateCartTotal();
    }

    renderCartItems();

    document.querySelector('.btn-checkout')?.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Vielen Dank für Ihre Bestellung!');
            localStorage.removeItem('cart');
            window.location.reload();
        } else {
            alert('Ihr Warenkorb ist leer.');
        }
    });

    const addToCartForm = document.getElementById('add-to-cart-form');
    addToCartForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const productName = document.getElementById('product-name')?.value;
        const productPrice = parseFloat(document.getElementById('product-price')?.value);
        const productSize = document.getElementById('size')?.value;
        const productQuantity = parseInt(document.getElementById('quantity')?.value, 10);
        const productImage = document.getElementById('product-image')?.value;

        if (!productName || !productPrice || !productSize || !productQuantity || !productImage) {
            console.error('Missing product information');
            return;
        }

        const product = {
            name: productName,
            price: productPrice,
            size: productSize,
            quantity: productQuantity,
            image: productImage
        };

        console.log('Product added to cart:', product);  // Log the product data

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produkt wurde zum Warenkorb hinzugefügt!');
    });
});