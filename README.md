# Product Carousel Project

This project aims to create an exact replica of the product carousel displayed on the homepage of the e-bebek website.

## About the Project

This project aims to create a pixel-perfect replica of the product carousel found in the "Beğenebileceğinizi düşündüklerimiz" section on the homepage of the e-bebek website. The product carousel is appended after the **'hero banner'**. This project used only **JavaScript** code. Products are fetched from the **JSON API**.

## Features

- **Product List**: Products are fetched from an API or local storage.
- **Home Page**: The code only works on the home page. If the user is on any other page, they will get an “incorrect page” error.
- **Carousel Creation**: Products are added to the webpage as a carousel.The product carousel is appended after the 'hero banner'.
- **Product Details**: Each product displays an image, title, price, rating star, product promotion, favorite icon and add to cart button.
- **Discount Calculation**: If the “price” and “original_price” values ​​are different, both prices are shown on the product card and the discount amount is calculated.
- **Favorite Functionality**: Users can mark products as favorites, and this information is stored in local storage. Products previously marked as favorites are displayed with filled heart icons.
- **Local Storage**: The second time the code runs, it pulls the product list from local storage instead of sending a new fetch request.
- **Product Links**: Clicking on product cards opens the product's webpage.
- **Responsive Design:** The website is designed to be responsive and adapt to different screen sizes.

## Technologies 

- **HTML5:** Used for user interface structure.
- **CSS3:** Modern CSS features like Flexbox and Grid were used for styling and layout.
- **JavaScript (ES6+):** Used for interaction and logic.

## API Information

- **API URL**: `https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json`
- **API Response Format**: JSON

## Usage

The project mimics the product carousel on the Ebebek website. You can use the arrows on the sides of the carousel to navigate between products.

## Requirements
- A modern web browser
- JavaScript support

## 📂 Project Structure

    📦 /
    │── 📂 assets/ # Styles & Images
    │ ├── 🖼️ image # Background & other images
    ├── 📄 index.html # Main HTML file
    ├── 📄 script.js # JavaScript logic
    └── 📄 README.md # Documentation
    

## 📝 JSON Data Structure

Each product in the products.json file follows this structure:

    [
        {
            "id": "Product Id",
            "name": "Product Name",
            "price": 100,
            "image": "assets/product1.jpg",
            "link": "https://example.com/product1",
            "details": "Product description",
        }
    ]









