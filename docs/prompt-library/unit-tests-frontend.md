---
id: unit-tests-frontend
title: Automating Unit Test Generation for Frontend Code
sidebar_label: Frontend Unit Tests
---
## Prompt Template:
"Generate unit tests for the functions **[FUNCTION_NAMES]** in **[MODULE_NAME]**. The tests should cover various scenarios, including edge cases, and use Python's unittest framework (or preferred testing framework). Provide assertions to verify that the functions return the expected results for different inputs. Ensure that the generated tests can be run directly and include any necessary imports."


## Scenario
You have a React application with a component that contains important UI logic. You want to generate unit tests for this component to ensure it behaves as expected under various conditions. The project structure is as follows:

```
my-react-app/
├── src/
│   ├── components/
│   │   └── LoginForm.jsx
│   └── App.jsx
└── tests/
    └── LoginForm.test.jsx
```

**Contents of src/components/LoginForm.jsx:**

```jsx
// src/components/LoginForm.jsx

import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      onLogin({ email, password });
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />
      </div>
      <button type="submit" data-testid="submit-button">Login</button>
    </form>
  );
}

export default LoginForm;
```

## Prompt to Use in Fynix
"Please generate unit tests for the LoginForm component in LoginForm.jsx. The tests should cover various scenarios, including:

1. Rendering the component correctly.
2. Updating state when the email and password inputs change.
3. Submitting the form successfully when both email and password are provided.
4. Displaying an alert when email or password is missing on form submission.

Use Jest and React Testing Library for testing. Provide the necessary imports and ensure the tests can be run directly.“

## Expected Output from Fynix
**Contents of tests/LoginForm.test.jsx:**

```jsx
// tests/LoginForm.test.jsx

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from '../src/components/LoginForm';

describe('LoginForm Component', () => {
  test('renders the LoginForm component', () => {
    render(<LoginForm onLogin={jest.fn()} />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('updates email and password state on change', () => {
    render(<LoginForm onLogin={jest.fn()} />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls onLogin with email and password when form is submitted', () => {
    const mockOnLogin = jest.fn();
    render(<LoginForm onLogin={mockOnLogin} />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });

  test('shows alert when email or password is missing on form submission', () => {
    window.alert = jest.fn();
    render(<LoginForm onLogin={jest.fn()} />);
    const submitButton = screen.getByTestId('submit-button');

    // Submit with empty email and password
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith('Please enter both email and password.');

    // Submit with only email
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith('Please enter both email and password.');

    // Submit with only password
    fireEvent.change(emailInput, { target: { value: '' } });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith('Please enter both email and password.');
  });
});
```

## Instructions to Run and See Output

1. **Project Setup Confirmation:**
    Ensure your project structure matches the following:

```
my-react-app/
├── src/
│   ├── components/
│   │   └── LoginForm.jsx
│   └── App.jsx
└── tests/
    └── LoginForm.test.jsx
```


2. **Copy the Code:**

    * Place the provided LoginForm.jsx in my-react-app/src/components/.
    * Place the generated LoginForm.test.jsx in my-react-app/tests/.

3. **Install Necessary Dependencies:**

Open a terminal in the my-react-app directory and install the necessary packages:

```bash
npm install --save react react-dom
npm install --save-dev @testing-library/react @testing-library/jest-dom jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```

4. **Configure Jest and Babel:**

Create a jest.config.js file in the root directory with the following content:

```js
// jest.config.js

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
};
```

Create a .babelrc file in the root directory with the following content:

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```


1. **Add Testing Scripts to package.json:**

In your package.json, add the following script:

```
"scripts": {
  "test": "jest"
}
```

2. **Run the Tests:**

In the terminal, run:

```bash
npm test
```

3. **Expected Output:**

You should see output similar to:

```
PASS  tests/LoginForm.test.jsx
  LoginForm Component
    ✓ renders the LoginForm component (xx ms)
    ✓ updates email and password state on change (xx ms)
    ✓ calls onLogin with email and password when form is submitted (xx ms)
    ✓ shows alert when email or password is missing on form submission (xx ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        xx.xxs
Ran all test suites.
```



This indicates that all the tests have passed successfully.

*Note:* Replace `my-react-app`, `LoginForm.jsx`, and component names with your actual project names and components when using the prompt in your real work scenarios.

