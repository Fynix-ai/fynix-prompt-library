---
id: react-styling
title: Styling Components to Match Pixel-Perfect Designs
sidebar_label: React Styling
---

## Prompt Template:
"Generate a React component named **[ComponentName]** based on the following design specifications:


* **[List of design requirements, including dimensions, colors, fonts, and styling details]**
* Use [**CSS modules/styled-components/plain CSS]** for styling, following **[naming conventions]**.
* Include any necessary imports, and ensure the component can be used directly in a React application.

Also, provide the corresponding CSS file **[CSSFileName]** with all the required styles.“


## Scenario
You have been provided with a detailed design mockup for a ProductCard component that needs to match the design pixel-perfectly. The design specifications include exact dimensions, colors, fonts, and layout.

**Design Specifications:**

* **Component Name:** ProductCard
* **Props:**
    * productName (string): The name of the product.
    * price (number): The price of the product.
    * imageUrl (string): URL to the product image.
* **Design Details:**
    * Card Dimensions: Width: 300px, Height: 400px.
    * Card Background: White (#FFFFFF) with subtle shadow.
    * Product Image:
        * Positioned at the top.
        * Width: 100%.
        * Height: 60% of the card height.
        * Object-fit: cover.
    * Product Name:
        * Font: Roboto, 18px, Bold.
        * Color: #333333.
        * Margin: 16px top.
    * Price:
        * Font: Roboto, 16px, Regular.
        * Color: #FF5733.
        * Margin: 8px top.
    * Add to Cart Button:
        * Width: 80%.
        * Height: 40px.
        * Background Color: #28A745.
        * Font: Roboto, 16px, Bold.
        * Color: #FFFFFF.
        * Border: None.
        * Border Radius: 5px.
        * Centered horizontally.
        * Margin: 16px top.
* **Styling Requirements:**
    * Use CSS modules for styling.
    * Class names should be meaningful and follow BEM naming conventions.
    * Ensure the component is responsive on mobile devices (e.g., adjust dimensions proportionally).


**Project Structure:**

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.module.css
│   └── App.jsx
└── package.json
```


## Prompt to Use in Fynix
"Generate a React component named ProductCard based on the following design specifications:

* The component should accept three props: productName (string), price (number), and imageUrl (string).
* The component should render a card with the following features:
    * Dimensions: Width 300px, Height 400px.
    * White background (#FFFFFF) with a subtle shadow.
    * Product image at the top, covering 60% of the card height, using imageUrl.
    * Product name displayed below the image, styled with Roboto font, 18px, bold, color #333333.
    * Price displayed below the product name, styled with Roboto font, 16px, color #FF5733.
    * An 'Add to Cart' button at the bottom, styled as per the design details.
* Use CSS modules for styling, with class names following BEM naming conventions.
* Include any necessary imports, and ensure the component can be used directly in a React application.

Also, provide the corresponding CSS module file ProductCard.module.css with all the required styles.“


## Expected Output from Fynix
**Contents of src/components/ProductCard.jsx:**

```jsx
// src/components/ProductCard.jsx

import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ productName, price, imageUrl }) {
  return (
    <div className={styles['product-card']}>
      <img src={imageUrl} alt={productName} className={styles['product-card__image']} />
      <div className={styles['product-card__info']}>
        <h2 className={styles['product-card__name']}>{productName}</h2>
        <p className={styles['product-card__price']}>${price.toFixed(2)}</p>
        <button className={styles['product-card__button']}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
```

**Contents of src/components/ProductCard.module.css:**

```css
/* src/components/ProductCard.module.css */

.product-card {
  width: 300px;
  height: 400px;
  background-color: #FFFFFF;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-card__image {
  width: 100%;
  height: 60%;
  object-fit: cover;
}

.product-card__info {
  width: 100%;
  padding: 16px;
  text-align: center;
}

.product-card__name {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin: 16px 0 8px 0;
}

.product-card__price {
  font-size: 16px;
  color: #FF5733;
  margin: 0 0 16px 0;
}

.product-card__button {
  width: 80%;
  height: 40px;
  background-color: #28A745;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-card__button:hover {
  background-color: #218838;
}

@media screen and (max-width: 600px) {
  .product-card {
    width: 90%;
    height: auto;
  }

  .product-card__image {
    height: auto;
  }
}
```


**Contents of src/App.jsx:**

```jsx
// src/App.jsx

import React from 'react';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <ProductCard
        productName="Wireless Headphones"
        price={99.99}
        imageUrl="https://via.placeholder.com/300x240"
      />
    </div>
  );
}

export default App;
```


## Instructions to Run and See Output

1. **Set Up the React Application:**
    If you don't already have a React application set up, create one using create-react-app:

npx create-react-app my-react-appcd my-react-app

2. **Install Required Fonts and Dependencies:**

* Install the Roboto font. You can add the following line in the `<head>` section of your `public/index.html`:
```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" />
```

3. **Create the Component Files:**

    * Create ProductCard.jsx:
        * Navigate to src/components/.
        * Create a new file named ProductCard.jsx.
        * Copy and paste the ProductCard component code provided above into ProductCard.jsx.
    * Create ProductCard.module.css:
        * In the same directory (src/components/), create a new file named ProductCard.module.css.
        * Copy and paste the CSS code provided above into ProductCard.module.css.
    * Update App.jsx:
        * Open src/App.jsx.
        * Replace its contents with the App component code provided above.

4. **Run the Application:**

In the terminal, run:

```bash
npm start
```

This will start the development server and open the application in your default web browser at http://localhost:3000.

5. **View the Output:**

    * You should see the ProductCard component displayed in the center of the page.
    * The card should match the design specifications:
        * Dimensions of 300px width and 400px height.
        * White background with a subtle shadow and rounded corners.
        * Product image at the top.
        * Product name and price displayed with the specified styles.
        * 'Add to Cart' button styled accordingly.

6. **Test Responsiveness:**

    * Resize your browser window to see the component adjust for smaller screens.
    * On mobile widths (below 600px), the card width should adjust to 90% of the screen width, and the height should adjust automatically.

Note: Replace my-react-app, ProductCard.jsx, and component names with your actual project names and components when using the prompt in your real work scenarios.


