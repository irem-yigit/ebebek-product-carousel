# Product Carousel Project
<a name="readme-top"></a>
This project aims to create an exact replica of the product carousel displayed on the homepage of the e-bebek website.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#about-the-project">About the Project</a>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technologies">Technologies</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-information">API Information</a></li>
    <li><a href="#json-data-structure">JSON Data Structure</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#additional-information">Additional Information</a></li>
  </ol>
</details>


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

## Usage

The project mimics the product carousel on the Ebebek website. You can use the arrows on the sides of the carousel to navigate between products.

## Technologies 

- **HTML5:** Used for user interface structure.
- **CSS3:** Modern CSS features like Flexbox and Grid were used for styling and layout.
- **JavaScript (ES6+):** Used for interaction and logic.
<p align="right"><a href="#readme-top">Back to the Top ↑ </a></p>

## ⚙️ Getting Started 

### Requirements

To run the project, you must have the following software installed on your system:

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Visual Studio Code or another IDE

### Installation 

1. Clone the project:
   
   ```bash
   git clone https://github.com/irem-yigit/product-carousel-project.git
   ```  
2. Go to the project directory:
   
   ```bash
   cd product-carousel-project
   ```  
3. Open the `index.html` file (or integrate it into your project).

4. Add the `script.js` file to your project.


## API Information

- **API URL**: 
    `https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json`

- **API Response Format**: JSON

## 📝 JSON Data Structure

Each product in the products.json file follows this structure:

    [
        {
            "id": "Product Id",
            "brand": "Product Brand",
            "name": "Product Name",
            "url": "https://example.com/product1",
            "img": "assets/product1.jpg",
            "price": 89.99,
            "original_price": 89.99
        }
    ]

## 📂 Project Structure

    📦 product-carousel-project/
    ├── 📄 index.html # Main HTML file
    ├── 📄 script.js # JavaScript logic
    └── 📄 README.md # Documentation

## 📸 Screenshots

### 🔹 **Product Carousel**

![Product Carousel](screenshots/carousel.png)

## 🎯 Additional Information

* This project consists of a single JavaScript (.js) file. 
* HTML and CSS structures are created using JavaScript. 
* This JavaScript code is executable in the Chrome Developer Tools console.
