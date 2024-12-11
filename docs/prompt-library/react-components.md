---
id: react-components
title: Building React Components from Design Specifications
sidebar_label: React Components
---
## Prompt Template:
"Generate unit tests for the React component **[ComponentName]** in **[FilePath]**. The tests should cover:

* **[List of scenarios and behaviors to test]**

Use Jest and React Testing Library for testing. Provide the necessary imports and ensure the tests can be run directly."


## Scenario

You have been provided with a design specification for a UserCard component that displays user information in a card format. The design includes the following requirements:

**Component Name:** UserCard

**Props:**

**name (string):** The user's full name.

**title (string):** The user's job title.

**avatarUrl (string):** URL to the user's avatar image.

**Design Specifications:**
The card should have a shadow and rounded corners.

The avatar image should be circular and displayed at the top center of the card.

The user's name should be displayed in bold below the avatar.

The user's job title should be displayed below the name in italic.

The card should have a fixed width of 300px.
Use a clean and modern font.

**Styling:**

Use CSS-in-JS with styled-components or plain CSS modules.

Ensure responsiveness for mobile devices.


**Project Structure:**

```
my-react-app/
├── src/
│   ├── components/
│   │   └── UserCard.jsx
│   └── App.jsx
└── package.json
```


## Prompt to Use in Fynix
"Please generate a React component named UserCard based on the following design specifications:

* **The component should accept three props:** name (string), title (string), and avatarUrl (string).
* **The component should display a card with the following features:**
    * A container with a shadow and rounded corners.
    * A circular avatar image at the top center using avatarUrl.
    * The name displayed in bold text below the avatar.
    * The title displayed in italic text below the name.
    * The card should have a fixed width of 300px.
* Use inline CSS styles or CSS modules for styling.
* Ensure the component is responsive on mobile devices.
* Include any necessary imports, and make sure the component can be used directly in a React application.“


## Expected Output from Fynix

**Contents of src/components/UserCard.jsx:**

```jsx
// src/components/UserCard.jsx

import React from 'react';

function UserCard({ name, title, avatarUrl }) {
  const cardStyle = {
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    margin: 'auto',
    overflow: 'hidden',
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginTop: '20px',
    objectFit: 'cover',
  };

  const nameStyle = {
    fontWeight: 'bold',
    fontSize: '1.2em',
    margin: '10px 0 5px 0',
  };

  const titleStyle = {
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: '20px',
  };

  return (
    <div style={cardStyle}>
      <img src={avatarUrl} alt={`${name}'s avatar`} style={avatarStyle} />
      <div style={nameStyle}>{name}</div>
      <div style={titleStyle}>{title}</div>
    </div>
  );
}

export default UserCard;
```

**Contents of src/App.jsx:**

```jsx
// src/App.jsx

import React from 'react';
import UserCard from './components/UserCard';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>User Card Example</h1>
      <UserCard
        name="Jane Doe"
        title="Software Engineer"
        avatarUrl="https://via.placeholder.com/100"
      />
    </div>
  );
}

export default App;
```

## Instructions to Run and See Output

1. **Set Up the React Application:**
    If you don't already have a React application set up, create one using create-react-app:

```bash
npx create-react-app my-react-appcd my-react-app
```

2. **Replace or Create Component Files:**

    * Create the UserCard.jsx Component:
        * Navigate to src/components/.
        * Create a new file named UserCard.jsx.
        * Copy and paste the UserCard component code provided above into UserCard.jsx.
    * Update App.jsx:
        * Open src/App.jsx.
        * Replace its contents with the App component code provided above.

3. **Install Dependencies:**

    * If you're using inline styles as in the example, there are no additional dependencies.
    * If you prefer to use styled-components or another CSS-in-JS library, install it accordingly.

4. **Run the Application:**

In the terminal, run:

```bash
npm start
```

This will start the development server and open the application in your default web browser at http://localhost:3000.

5. **View the Output:**

    * You should see a heading "User Card Example" centered at the top.
    * Below the heading, the UserCard component displays:
        * A card with a shadow and rounded corners.
        * A circular avatar image.
        * The name "Jane Doe" in bold.
        * The title "Software Engineer" in italic.

6. **Test Responsiveness:**

    * Resize your browser window to observe the component's responsiveness.
    * The card should remain centered and adjust appropriately on smaller screens.

**Note:** Replace `my-react-app`, `UserCard.jsx`, and component names with your actual project names and components when using the prompt in your real work scenarios.

