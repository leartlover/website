document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            name: 'Sea Sail Walk Loafers',
            category: 'shoes',
            price: 850,
            image: 'images/FAN1317_H0PO_MEDIUM.avif',
            link: 'produkt3.html'
        },
        {
            name: 'Hose Pantaflat',
            category: 'pants',
            price: 1200,
            image: 'images/FAE8346_D0J2_MEDIUM.jpg.avif',
            link: 'produkt2.html'
        },
        {
            name: 'Polohemd Hotaka',
            category: 'shirts',
            price: 920,
            image: 'images/1.jpg',
            link: 'produkt1.html'
        }
    ];

    const productGrid = document.getElementById('product-grid');
    const categoryFilter = document.getElementById('category-filter');
    const priceSort = document.getElementById('price-sort');

    function displayProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3><a href="${product.link}">${product.name}</a></h3>
                <p>${product.price.toFixed(2)} CHF</p>
            `;
            productGrid.appendChild(productElement);
        });
    }

    function filterProducts() {
        const category = categoryFilter.value;
        let filteredProducts = products;

        if (category !== 'all') {
            filteredProducts = products.filter(product => product.category === category);
        }

        const sortOption = priceSort.value;
        if (sortOption === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(filteredProducts);
    }

    categoryFilter.addEventListener('change', filterProducts);
    priceSort.addEventListener('change', filterProducts);

    // Initial display
    displayProducts(products);
});