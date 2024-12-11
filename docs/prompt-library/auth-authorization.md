---
id: auth-authorization
title: Implementing Authentication and Authorization Mechanisms
sidebar_label: Authentication and Authorization
---
## Prompt Template:

"Fynix, I need to implement authentication and authorization in my [language/framework] application. Specifically:

1. **[Describe the authentication requirements]**
2. **[Describe the authorization requirements]**

Please provide the necessary code, including any middleware, route handlers, and configurations. Ensure the code is ready to run and includes all necessary imports.“




## Scenario

You are building a Node.js RESTful API using Express.js and need to implement user authentication and authorization. Users should be able to:

* Register with a username and password.
* Log in to receive a JWT for authentication.
* Access protected routes only if they provide a valid JWT.
* Implement authorization checks to allow only certain users to access specific routes based on their roles.



**Project Structure**
```
auth-example/
├── app.js
├── package.json
├── routes/
│   ├── auth.js
│   └── protected.js
└── users.js
```

## Prompt to Use in Fynix
"Fynix, I need to implement authentication and authorization in my Node.js Express application. Specifically:

1. **User Registration and Login:**

    * Create routes for user registration (`/register`) and login (`/login`) in r`outes/auth.js`.
    * Use bcrypt to hash passwords before storing them.
    * Upon successful login, generate a JWT using jsonwebtoken and send it to the client.

2. **Protecting Routes with JWT:**

    * Create a middleware function authenticateToken in app.js to verify JWTs.
    * Apply this middleware to protected routes defined in `routes/protected.js`.

3. **Authorization Based on User Roles:**

    * Include a role property (e.g., 'admin', 'user') in the JWT payload.
    * In `routes/protected.js`, create a route that only allows access to users with the 'admin' role.

Please provide the necessary code for `app.js, routes/auth.js`, `routes/protected.js`, and any other files required. Include all necessary imports and ensure the code can be run directly.“


## Expected Output from Fynix

```package.json``` Dependencies

First, ensure the necessary packages are installed:

```bash
npm init -y
npm install express jsonwebtoken bcrypt body-parser
```

```js
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Users data (in-memory for simplicity)
const users = require('./users');

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  const SECRET_KEY = 'your-secret-key'; // Use environment variables in production

  require('jsonwebtoken').verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.user = user;
    next();
  });
}

app.use('/auth', authRoutes);
app.use('/protected', authenticateToken, protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

```js
// users.js

// In-memory user storage
const users = [];

module.exports = users;
```

```js
// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../users');

const SECRET_KEY = 'your-secret-key'; // Use environment variables in production

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if user already exists
    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    users.push({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find((user) => user.username === username);
    if (!user) return res.status(400).json({ message: 'Cannot find user' });

    // Compare password
    if (await bcrypt.compare(password, user.password)) {
      // Generate JWT
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        SECRET_KEY
      );
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: 'Password incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
```

```js
// routes/protected.js

const express = require('express');
const router = express.Router();

// Middleware to authorize based on user role
function authorizeRoles(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
}

// Protected route accessible to any authenticated user
router.get('/dashboard', (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! Welcome to your dashboard.` });
});

// Protected route accessible only to admin users
router.get('/admin', authorizeRoles(['admin']), (req, res) => {
  res.json({ message: `Hello, Admin ${req.user.username}!` });
});

module.exports = router;
```


## Instructions to Run and See Output

1. **Set Up the Project**

    * Create a new directory for the project and navigate into it:
```bash
mkdir auth-examplecd auth-example
```

    * Initialize a new Node.js project and install dependencies:
```bash
npm init -y
npm install express jsonwebtoken bcrypt body-parser
```

2. **Create the Project Structure**

    * Create the necessary directories and files:
```bash
mkdir routestouch app.js routes/auth.js routes/protected.js users.js
```

3. **Copy the Code**

    * Copy and paste the provided code snippets into their respective files.

4. **Run the Application**

    * Start the server:

```bash
node app.js
```

    * You should see:

Server running on http://localhost:3000


5. **Test the Authentication Flow**

    * Use a tool like Postman or curl to interact with the API.

**Register a New User**
```
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "password123", "role": "admin"}'
```

    * Expected Response:
```
{
"message": "User registered successfully"
}
```

**Log In to Receive a JWT**
```
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "password123"}'
```

    * Expected Response (will include a JWT):
```
{
"accessToken": "your_jwt_token_here"
}
```

**Access Protected Route (/protected/dashboard)**
```
curl http://localhost:3000/protected/dashboard \
  -H "Authorization: Bearer your_jwt_token_here"
```

    * Expected Response:
```
{
"message": "Hello, john! Welcome to your dashboard."
}
```

**Access Admin Route (/protected/admin)**
```
curl http://localhost:3000/protected/admin \
  -H "Authorization: Bearer your_jwt_token_here"
```

    * Expected Response:
```
{
"message": "Hello, Admin john!"
}
```

1. **Test Unauthorized Access**

    * Try accessing the protected route without a token:
```
curl http://localhost:3000/protected/dashboard
```
    * Expected Response:
```
Unauthorized
```

**Note:** Replace 'your-secret-key' with a secure key, preferably stored in an environment variable, when implementing in a real application.