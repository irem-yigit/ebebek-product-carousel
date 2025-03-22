document.addEventListener('DOMContentLoaded', () => {
    const init = () => {
        if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
            console.log('Home page detected');
            loadProducts();
        } else {
            console.log('Wrong Page!');
        }
    };
    
    
    const loadProducts = async () => {
        const products = await getProductList();
        buildHTML(products);
        buildCSS();
        setEvents(products);
    };
    
    const getProductList = async () => {
        let productList = localStorage.getItem('productList');
        try {
            const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            productList = await response.json();
            localStorage.setItem('productList', JSON.stringify(productList));
            return productList;
        } catch (error) {
            console.error('API request failed:', error);
            alert("Products could not be loaded.Please try again.");
            return [];
        }
    };

    const buildHTML = (products) => {
        const storiesContainer = document.createElement('div');
        storiesContainer.id = 'stories';

        storiesContainer.innerHTML = `
            <div class="story">Story 1</div>
            <div class="story">Story 2</div>
            <div class="story">Story 3</div>
            <div class="story">Story 4</div>
            <div class="story">Story 5</div>
            <div class="story">Story 6</div>
        `;
        const bannerContainer = document.createElement('div');
        bannerContainer.id = 'banner-container';
        
        const bannerTitle = document.createElement('h2');
        bannerTitle.textContent = 'Sizin için Seçtiklerimiz';
        bannerTitle.classList.add('banner-title');
        bannerContainer.appendChild(bannerTitle);
        
        const carouselContainer = document.createElement('div');
        carouselContainer.id = 'product-carousel';
        carouselContainer.classList.add('carousel');
    
        const productListContainer = document.createElement('div');
        productListContainer.classList.add('product-list');
        
        products.forEach(product => {
            productListContainer.appendChild(createProductCard(product));
        });
        
        carouselContainer.appendChild(productListContainer);
        bannerContainer.appendChild(carouselContainer);
    
        const storiesElement = document.querySelector('#stories');
        if (!storiesElement) {
            document.body.appendChild(storiesContainer); 
        }
      
        const carouselElement = document.querySelector('#product-carousel');
        if (carouselElement) {
            carouselElement.before(bannerContainer);
        } else {
            document.body.appendChild(bannerContainer);
        }
    };
    
    const createProductCard = (product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.productId = product.id;
    
        productCard.innerHTML = `
            <img src="${product.img}" class="product-image">
            <div class="product-details">
                <p class="product-title"><span class="product-brand">${product.brand}</span> - ${product.name}</p>
                <div class="product-rating">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                </div>
                <div class="discount-badge">
                    <span class="price">${product.price} TL</span>
                    <span class="discount-percent">%30</span>
                    <span class="arrow-down">▼</span>
                </div>
                <div class="product-original-price-promotion">
                    <h3 class="product-original-price">${product.original_price} TL</h3>
                    <p class="product-promotion">Farklı ürünlerde 3 al 2 öde</p>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-button">Sepete Ekle</button>
                    <button class="favorite-button">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        return productCard;
    };
    
    const buildCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
            #banner-container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                margin: 20px auto;
                max-width: 1200px;  
            }
            .banner-title {
                font-size: 2rem;
                font-family: 'Quicksand-Bold', sans-serif;
                margin-bottom: 15px;
                color: #f28e00;
                margin: 0;
                line-height: 1.11;
                padding: 25px 67px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #fff6eb;
                border-top-left-radius: 35px;
                border-top-right-radius: 35px;
                font-weight: 700;
            }
            .carousel {
                display: flex;
                overflow-x: auto;
                padding: 10px 0;
                margin-top: auto;
            }
            .product-list {
                display: flex;
                gap: 15px;
            }
            .product-card {
                font-family: 'Poppins', sans-serif;
                width: 200px;
                padding: 5px;
                background-color: #fff;
                color: #7d7d7d;
                border-radius: 8px;
                padding: 10px;
                text-align: center;
                margin: 0 0 20px 3px;
                border: 1px solid #ededed;
                position: relative;
                cursor:pointer; 
                display: flex; 
                flex-direction: column; 
                transition: border-color 0.3s ease-in-out;
            }
            .product-card:hover {
                box-shadow: 0 0 0 0 #00000030, inset 0 0 0 3px #f28e00;
            }
            .product-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            .product-details {
                padding: 10px;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
            }
            .product-title {
                font-family: 'Poppins', sans-serif;
                color: #7d7d7d;
                font-size: 12px;
                margin-bottom: 5px;
                text-align: left;
            }
            .product-brand {
                font-weight: bold; 
            }
            .product-rating {
                color: #ffcf00; 
                margin-bottom: 5px;
                text-align: left;
            }
            .product-original-price-promotion {
                font-family: 'Poppins', sans-serif;
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                align-items: flex-start;
            }
            .product-original-price {
                font-size: 20px;
                margin-bottom: 5; 
                margin-right: 10px;
                text-align: left;
                color: #7d7d7d;
            }
            .product-promotion {
                font-size: 12px;
                color: #00a365; 
                margin-bottom: 10px;
                background-color: #90d8bf4a; 
                border: none;
                padding: 10px 15px;
                border-radius: 20px; 
                text-align: left; 
            }
            .product-actions {
                display: flex;
                justify-content: space-between;
                margin-top: auto; 
            }
            .discount-badge {
                font-family: 'Poppins', sans-serif;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 14px;
                margin-bottom: 5px;
                text-align: left;
                display: flex; 
                align-items: center; 
            }
            .price {
                font-size: 14px;
                text-decoration: line-through; 
                color: #7d7d7d; 
                margin: 0;
            }
            .discount-percent {
                color: #00a365;
                font-family: 'Poppins', sans-serif;
                padding: 3px 6px;
                border-radius: 3px;
                font-size: 18px;
                font-weight: bold;
                margin: 0;
                font-weight: 700;
                display: inline-flex;
                justify-content: center;
            }
            .arrow-down {
                font-size: 14px;
                color: white;
                background-color: #00a365;
                border-radius: 200%;
                padding: 0 3px;
                font-weight: bold;
            }
            .add-to-cart-button {
                background-color: #fff7ec; 
                color: #f28e00;
                font-family:'Poppins', sans-serif;
                font-weight: bold;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
                border-radius: 20px; 
                width: 100%;
                height: 40px;
                transition: background-color 0.3s ease;
            }
            .add-to-cart-button:hover {
                background-color: #f28e00; 
                color: white;
            }
            .favorite-button {
                background-color: transparent; 
                border: 1px solid #ededed;
                font-size: 1.2em;
                cursor: pointer;
                position: absolute; 
                top: 10px; 
                right: 10px; 
                border-radius: 70%; 
                width: 40px; 
                height: 40px; 
                display: flex;
                justify-content: center; 
                align-items: center;
                box-shadow: 0 2px 4px 0 #00000024;
                transition: opacity .3s ease-in-out;
            }
            .favorite-button:hover {
                box-shadow: 0 0 0 0 #00000030, inset 0 0 0 1px #f28e00;
            }
            .favorite-button svg {
                width: 40px;
                height: 40px;
                fill: none; 
                stroke: #ff8708;
                stroke-width: 2;
            }
            .favorite-button.filled svg {
                fill: #ff8708; 
            }
            #stories {
                display: flex;
                overflow-x: auto;
                padding: 10px 0;
                gap: 10px;
                margin-bottom: 20px; 
                justify-content: center; 
                align-items: center;
            }
            .story {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background-color: #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);
    };
    
    const setEvents = (products) => {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = parseInt(card.dataset.productId);
            const heartIcon = card.querySelector('.favorite-button');
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            
            if (favorites.includes(productId)) {
                heartIcon.classList.add('filled');
            }
    
            heartIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleFavorite(productId, heartIcon);
            });

            card.addEventListener('click', () => {
                const product = products.find(p => p.id === productId);
                window.open(product.url, '_blank');
            });
        });
    };
    
    const toggleFavorite = (productId, heartIcon) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
        if (favorites.includes(productId)) {
            favorites = favorites.filter(id => id !== productId);
            heartIcon.classList.remove('filled'); 
        } else {
            favorites.push(productId);
            heartIcon.classList.add('filled');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    init();
});

