---
id: input-validation
title: Implementing Input Validation and Error Handling in APIs
sidebar_label: Input Validation
---
## Scenario
You are building a user registration endpoint for a Python FastAPI application. The endpoint should:

1. Accept a JSON payload with username and email.
2. Validate the input data:

    * username: Required, must be a string of at least 3 characters.
    * email: Required, must be a valid email format.

3. If the input is invalid, respond with a 400 error and a detailed error message.
4. If an unexpected error occurs (e.g., database issue), respond with a 500 error and a generic error message.
5. Log errors for debugging purposes.

**Assumptions:**

* You have Python 3.7+ installed.
* No additional dependencies are installed yet; you will install them using pip.


**Project Structure**

```
fastapi-example/
├── main.py
└── requirements.txt
```


## Prompt to Use in Fynix

"Fynix, I need to implement input validation and error handling in my FastAPI endpoint. Specifically:

1. Create a POST /users/register endpoint that accepts username and email fields in JSON.
2. Validate that username is at least 3 characters long and email is a valid email address.
3. If validation fails, return a 400 response with a detailed error message.
4. Implement a global exception handler for unexpected errors to return a 500 response with a generic error message.
5. Log errors to the console for debugging.

Please provide the complete main.py code and a requirements.txt file. Include instructions on how to run and test the endpoint so I can copy, paste, and see the output immediately.“


## Expected Output from Fynix

**requirements.txt:**

```
fastapi==0.95.2
uvicorn==0.22.0
pydantic==1.10.9
```

**main.py:**

```python
# main.py
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, validator
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Pydantic model for input validation
class UserCreate(BaseModel):
    username: str
    email: EmailStr

    @validator("username")
    def username_too_short(cls, v):
        if len(v) < 3:
            raise ValueError("Username must be at least 3 characters long.")
        return v

# Custom exception handler for 500 errors
@app.exception_handler(Exception)
async def internal_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred, please try again later."}
    )

@app.post("/users/register")
async def register_user(user: UserCreate):
    # Simulate potential unexpected error (comment out to test normal flow)
    # raise Exception("Simulated server error")

    # Normally, you'd save the user to the database here.
    # For simplicity, just return the validated user data.
    logger.info(f"User registered: {user.username}, {user.email}")
    return {"message": "User registered successfully", "user": user.dict()}
```


## Instructions to Run and See Output

1. **Set Up the Project Files:**

    * Create a directory named fastapi-example.
    * Save main.py and requirements.txt inside this directory.

2. **Install Dependencies:**

```bash
cd fastapi-example
pip install -r requirements.txt
```

3. **Run the Application:**

Start the FastAPI server with uvicorn:

```bash
uvicorn main:app --reload
```

You should see output like:

```
INFO:     Will watch for changes in these directories: ['.../fastapi-example']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

4. **Test the Endpoint:**

    * Valid Request:
        Send a POST request with valid data:

```
curl -X POST http://127.0.0.1:8000/users/register \
-H "Content-Type: application/json" \
-d '{"username": "john_doe", "email": "john@example.com"}'
```

**Expected Response:**

```
{
"message": "User registered successfully",
"user": {
"username": "john_doe",
"email": "john@example.com"
}
}
```


    * Invalid Request (Short Username):

```
curl -X POST http://127.0.0.1:8000/users/register \
-H "Content-Type: application/json" \
-d '{"username": "jd", "email": "john@example.com"}'
```

**Expected Response:**

```
{
"detail": [
{
"loc": ["body", "username"],
"msg": "Username must be at least 3 characters long.",
"type": "value_error"
}
]
}
```


    * Invalid Request (Invalid Email):

```
curl -X POST http://127.0.0.1:8000/users/register \
-H "Content-Type: application/json" \
-d '{"username": "jane_doe", "email": "not-an-email"}'
```


**Expected Response:**

```
{
"detail": [
{
"loc": ["body", "email"],
"msg": "value is not a valid email address",
"type": "value_error.email"
}
]
}
```


    * Simulated Unexpected Error:
        Uncomment the raise Exception("Simulated server error") line in main.py and run again:

```
curl -X POST http://127.0.0.1:8000/users/register \
-H "Content-Type: application/json" \
-d '{"username": "validuser", "email": "valid@example.com"}'
```


**Expected Response:**

```
{
"detail": "An unexpected error occurred, please try again later."
}
```

5. **Observe Logs:**

Check the console output where uvicorn is running. When an error occurs (like the simulated server error), you will see the error logged for debugging.
