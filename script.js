(() => {
    // Initialize script and check home page
    const init = () => {
        if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
            console.log('Home page detected');
            loadProducts();
        } else {
            console.log('Wrong Page!');
        }
    };

    // Load products and set up UI
    const loadProducts = async () => {
        const products = await getProductList();
        buildHTML(products);
        buildCSS();
        setEvents(products);
    };
    
    // Fetch the product list from API
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

    // Generate HTML structure
    const buildHTML = (products) => {
        // Create the main banner container
        const bannerContainer = document.createElement('div');
        bannerContainer.id = 'banner-container';
        
        const bannerTitle = document.createElement('h2');
        bannerTitle.textContent = 'Beğenebileceğinizi düşündüklerimiz';
        bannerTitle.classList.add('banner-title');
        bannerContainer.appendChild(bannerTitle);
        
        const carouselContainer = document.createElement('div');
        carouselContainer.id = 'product-carousel';
        carouselContainer.classList.add('carousel-container');

        const carouselScrollable = document.createElement('div'); 
        carouselScrollable.classList.add('carousel-scrollable');
        carouselContainer.appendChild(carouselScrollable);

        const prevButton = document.createElement('button'); 
        prevButton.classList.add('carousel-button', 'prev');
        prevButton.innerHTML = '&#8249;';
        carouselContainer.appendChild(prevButton);

        const nextButton = document.createElement('button'); 
        nextButton.classList.add('carousel-button', 'next');
        nextButton.innerHTML = '&#8250;'; 
        carouselContainer.appendChild(nextButton);

        const productListContainer = document.createElement('div');
        productListContainer.classList.add('product-list');
        
        // Create and append product cards
        products.forEach(product => {
            const productCard = createProductCard(product);
            carouselScrollable.appendChild(productCard);
        });
        bannerContainer.appendChild(carouselContainer);
    
        // Insert the carousel after the hero banner
        const heroBanner = document.querySelector("eb-hero-banner-carousel");
        if (heroBanner) {
            heroBanner.insertAdjacentElement("afterend", bannerContainer);
        }
        return [bannerContainer];
    };
    // Create product card 
    const createProductCard = (product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.productId = product.id;

        //Calculate the discount amount
        let discountPercent = 0;
        if (product.original_price && product.price < product.original_price) {
            discountPercent = Math.round(((product.original_price - product.price) / product.original_price) * 100);
        }
    
        // Generate product card HTML
        productCard.innerHTML = `
            <img src="${product.img}" class="product-image">
            <div class="product-details">
                <p class="product-title"><span class="product-brand">${product.brand}</span> - ${product.name}</p>

                <!-- Static 5-star rating -->
                <div class="product-rating">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                </div>

                <!-- Display discount -->
                <div class="discount-badge">
                    ${discountPercent > 0 
                        ? `<span class="price">${product.price}TL</span>
                           <span class="original-price">${product.original_price} TL</span>
                           <span class="discount-percent">%${discountPercent}</span>
                           <span class="arrow-down">▼</span>
                           <span class="original-price">${product.original_price} TL</span>`
                        : `<span class="price">${product.price} TL</span>`}
                </div>

                <!-- Display original price and promotion -->
                <div class="product-original-price-promotion">
                    ${product.original_price && product.price < product.original_price
                        ? `<h3 class="product-original-price">${product.original_price} TL</h3>` : ''}
                    <p class="product-promotion">Farklı ürünlerde 3 al 2 öde</p>
                </div>

                <!-- Action buttons: Add to cart & Favorite -->
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
    
    // Apply CSS styles
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
            .carousel-container {
                scroll-behavior: smooth;
                display: flex;
                overflow-x: auto;
                scrollbar-width: thin;
                padding: 10px 0;
                margin-top: auto;
                position: relative;
                width: 100%;
                overflow: visible;
            }
            .carousel-scrollable {
                display: flex;
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
                padding-bottom: 10px; 
                transition: scroll-left 0.5s ease-in-out;
            }
            .carousel-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: #fff7ec;
                color: orange;
                border: none;
                padding: 10px;
                cursor: pointer;
                font-size: 30px;
                z-index: 10;
                border-radius: 50px;
                width: 40px; 
                height: 40px; 
                display: flex;
                justify-content: center; 
                align-items: center;
                transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            }
            .carousel-button:hover {
                box-shadow: 0 0 0 0 #00000030, inset 0 0 0 1px #f28e00;
                background-color: white;
            }
            .carousel-button.prev {
                left: 10px;
            }
            .carousel-button.next {
                right: 10px;
            }
            .product-list {
                display: flex;
                gap: 15px;
            }
            .product-card {
                font-family: 'Poppins', sans-serif;
                width: 200px;
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
                overflow: hidden;
                flex: 0 0 auto;
                margin-right: 10px;
                scroll-snap-align: start;
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
                justify-content: space-between; 
                height: 100%; 
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
                font-size: 14px; 
                color: #7d7d7d; 
                margin-right: 5px;
                text-decoration: line-through;
                display: inline-block; 
                vertical-align: middle;
                margin-top: 1px; 
            }
            .product-promotion {
                font-size: 10px;
                color: #00a365; 
                background-color: #90d8bf4a; 
                border: none;
                padding: 5px 10px;
                border-radius: 20px; 
                text-align: left; 
                margin-top: 1px; 
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
                justify-content: flex-start;
                margin-left: -5px;
            }
            .discount-badge span {
                vertical-align: middle; 
            }
            .price {
                font-size: 20px;
                margin-bottom: 5; 
                margin-right: 10px;
                text-align: left;
                color: #7d7d7d;
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
                margin-left: -20px;
            }
            .arrow-down {
                font-size: 14px;
                color: white;
                background-color: #00a365;
                border-radius: 200%;
                padding: 0 5px;
                font-weight: bold;
                margin-left: -2px;
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
            /* (Mobile - max 768px) */
            @media (max-width: 768px) {
                #banner-container {
                    padding: 15px;
                    max-width: 90%;
                    margin: 10px auto;
                }
                .banner-title {
                    font-size: 1.5rem;
                    padding: 15px 20px;
                    text-align: center;
                    display: flex; 
                    align-items: center;
                    justify-content: center; 
                }
                .carousel-container {
                    flex-direction: column;
                    padding: 5px 0;
                }
                .carousel-button {
                    width: 30px;
                    height: 30px;
                    font-size: 20px;
                    background-color: rgba(255, 247, 236, 0.8); 
                }
                .carousel-scrollable::-webkit-scrollbar {
                    display: none; 
                }
                .carousel-scrollable {
                    display: flex;
                    flex-wrap: nowrap; 
                    -ms-overflow-style: none; 
                    scrollbar-width: none; 
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling: touch;
                }
                .product-list {
                    flex-direction: row;
                    overflow-x: scroll; 
                    scroll-snap-type: x mandatory;
                    gap: 10px;
                    scroll-behavior: smooth;
                }
                .product-card {
                    width: 150px;
                    margin-right: 5px;
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .product-image {
                    height: auto;
                    max-height: 200px; 
                    object-fit: cover;
                }
                .product-title {
                    font-size: clamp(10px, 2vw, 14px);
                }
                .product-promotion{
                    font-size: 10px;
                }
                .price {
                    font-size: 16px;
                }
                .discount-percent {
                    font-size: 14px;
                    margin-left: -10px;
                }
                .arrow-down {
                    margin-left: 0; 
                }
                .discount-badge {
                    margin-left: -10px; 
                }
                .add-to-cart-button {
                    font-size: 12px;
                    padding: 8px;
                }
                .favorite-button {
                    width: 30px;
                    height: 30px;
                }
                .favorite-button svg {
                    width: 30px;
                    height: 30px;
                }
            }
            /* (Mobile - max 480px) */
            @media (max-width: 480px) {
                .banner-title {
                    font-size: 1.2rem;
                    padding: 10px;
                }
                .carousel-container {
                    padding: 5px;
                    margin-left: -10px;
                    margin-right: -10px;
                }
                .carousel-button {
                    width: 20px;
                    height: 20px;
                    font-size: 15px;
                    background-color: rgba(255, 247, 236, 0.8); 
                }
                .product-card {
                    width: 120px; 
                }
                .product-image {
                    height: auto;
                    max-height: 100px;
                }
                .product-title {
                    font-size: clamp(10px, 2vw, 14px);
                }
                .price {
                    font-size: 16px;
                }
                .discount-percent {
                    font-size: 14px; 
                }
                .add-to-cart-button {
                    font-size: 12px;
                    padding: 8px;
                }
                .favorite-button {
                    top: 5px;
                    right: 5px;
                    width: 25px;
                    height: 25px;
                }
                .favorite-button svg {
                    width: 20px;
                    height: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Add event listeners
    const setEvents = (products) => {
        // Select all product cards
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
        // Select carousel elements
        const carouselScrollable = document.querySelector('.carousel-scrollable');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        const productCardWidth = 220;

        console.log('carouselScrollable:', carouselScrollable);
        console.log('prevButton:', prevButton);
        console.log('nextButton:', nextButton);

        // If the buttons and carousel are found, add event listeners
        if (prevButton && nextButton && carouselScrollable) {
            prevButton.addEventListener('click', () => {
                carouselScrollable.scrollBy({ left: -productCardWidth, behavior: 'smooth' });
            });

            nextButton.addEventListener('click', () => {
                carouselScrollable.scrollBy({ left: productCardWidth, behavior: 'smooth' });
            });
        } else {
            console.error('No carousel buttons or carousel Scrollable found!');
        }
        
    };
    
    // Function to toggle favorite (add/remove)
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
})();