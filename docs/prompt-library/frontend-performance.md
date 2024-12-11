---
id: frontend-performance
title: Optimizing Frontend Performance
sidebar_label: Frontend Performance
---

## Prompt Template:
"Fynix, I'm optimizing my React application and need help with performance improvements:

1. I have a component **[ComponentName]** that's large and slows down the initial load time. It's only needed when a user performs a specific action. How can I implement code splitting to load it only when needed?
2. I also have a component **[AnotherComponentName]** that re-renders unnecessarily. How can I use memoization to prevent this?

Please provide updated code snippets showing how to implement these optimizations.“





## Scenario

You have a React application that includes a large component called HeavyComponent, which is only needed when a user performs a specific action (e.g., clicks a button). Currently, HeavyComponent is imported normally, causing it to be included in the initial bundle and slowing down the application's load time.

Additionally, you have a component called ExpensiveList that renders a large list of items. This component re-renders unnecessarily when the parent component updates, even if the items prop hasn't changed, leading to performance issues.

You want to optimize your React application by:

Implementing Code Splitting to load HeavyComponent only when needed.
Using Memoization to prevent unnecessary re-renders of ExpensiveList.


**Project Structure**

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── HeavyComponent.jsx
│   │   ├── ExpensiveList.jsx
│   │   └── App.jsx
│   └── index.js
└── package.json
```

## Prompt to Use in Fynix

"Fynix, I'm looking to optimize my React application for better performance. Specifically:

1. I have a large component called HeavyComponent that's currently imported like this in `App.jsx`:

```import HeavyComponent from './components/HeavyComponent';```

Since HeavyComponent is only needed when the user clicks a button, I want to implement code splitting so it's loaded only when required, reducing the initial bundle size.

2. I also have a component called ExpensiveList that renders a large list of items. It re-renders unnecessarily when the parent component updates, even if the items prop hasn't changed. I want to memoize this component to prevent unnecessary re-renders.

Can you help me achieve these optimizations? Please provide the updated code snippets for `@App.jsx` and `@ExpensiveList.jsx`, including any necessary changes or additions. Ensure that the code can be copied and pasted to run immediately.“

## Expected Output from Fynix

**Updated App.jsx:**

```jsx
// src/components/App.jsx

import React, { useState, Suspense } from 'react';
import ExpensiveList from './ExpensiveList';

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  const items = Array.from({ length: 1000 }, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
  }));

  return (
    <div>
      <h1>Optimized React App</h1>
      <ExpensiveList items={items} />
      <button onClick={() => setShowHeavyComponent(true)}>
        Load Heavy Component
      </button>
      {showHeavyComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}

export default App;
```

**Updated ExpensiveList.jsx:**

```jsx
// src/components/ExpensiveList.jsx

import React from 'react';

const ExpensiveList = React.memo(({ items }) => {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

export default ExpensiveList;
```



## Instructions to Run and See Output

1. **Set Up the React Application**
    If you don't already have a React application set up, create one using create-react-app:

```bash
npx create-react-app my-react-appcd my-react-app
```

2. **Create the Component Files**

    * Create HeavyComponent.jsx

```jsx
// src/components/HeavyComponent.jsx
import React from 'react';
function HeavyComponent() {
  return (
    <div>
<h2>Heavy Component Loaded</h2>
<p>This component was loaded dynamically using code splitting.</p>
</div>
  );
}
export default HeavyComponent;
```

    * Create ExpensiveList.jsx
        Use the updated code provided above.
    * Update App.jsx
        Use the updated code provided above.

3. **Run the Application**

Start the development server:

```bash
npm start
```

The application will open in your default web browser at http://localhost:3000.

4. ** Test Code Splitting**

    * Initial Load
        * Observe that the application loads quickly.
        * Open the browser's developer tools and go to the Network tab.
        * Refresh the page and note that HeavyComponent is not loaded initially.
    * Load HeavyComponent
        * Click the "Load Heavy Component" button.
        * Observe that the HeavyComponent is displayed.
        * In the Network tab, notice that a new chunk (JS file) is loaded dynamically.

5. **Test Memoization**

    * Open the Console tab in the developer tools.
    * Observe the log ExpensiveList rendered when the app first loads.
    * Click the "Load Heavy Component" button again.
    * Verify that ExpensiveList does not re-render (no additional logs), confirming that memoization is working.


**Note:** Replace HeavyComponent, ExpensiveList, and other component names with the actual names used in your project when applying these optimizations.