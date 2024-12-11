---
id: api-boilerplate
title: Generating Boilerplate Code for New API Endpoints
sidebar_label: API Boilerplate
---
## **Prompt Template:**

"I need to create a new API endpoint using **[Framework]** in **[Language]**. The endpoint should handle a **[HTTP Method]** request at the path **[Endpoint Path]**, which **[describe the purpose of the endpoint]**. The endpoint should:

* **[First Requirement]**
* **[Second Requirement]**
* **[Third Requirement]**

Please generate the complete code for this endpoint, including all necessary imports and the **[Framework]** application setup. Ensure that the code is ready to run and test as-is."


## Prompt:
*I need to create a new API endpoint using FastAPI in Python. The endpoint should handle a GET request at the path `/users/{user_id}`, where `{user_id}` is a path parameter representing the user's ID. The endpoint should:

* Retrieve user information from a mock database (a simple Python dictionary).
* Return the user information in JSON format.
* If the user is not found, return a 404 error with an appropriate message.

Please generate the complete code for this endpoint, including all necessary imports and the FastAPI application setup. Ensure that the code is ready to run and test as-is.*

Expected Output:

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

# Mock database (dictionary of users)
users_db = {
    1: {"id": 1, "name": "Alice Smith", "email": "alice@example.com"},
    2: {"id": 2, "name": "Bob Johnson", "email": "bob@example.com"},
    3: {"id": 3, "name": "Charlie Lee", "email": "charlie@example.com"},
}

@app.get("/users/{user_id}")
def read_user(user_id: int):
    user = users_db.get(user_id)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")

# To run this application:
# 1. Save this code in a file named main.py
# 2. Install FastAPI and Uvicorn if you haven't already:
#    pip install fastapi uvicorn
# 3. Run the app using the command:
#    uvicorn main:app --reload
```


## Instructions to Run and Test the Code:

1. Save the Code:

    * Copy the code above into a new file named main.py.

2. Install Dependencies:

    * Open your terminal or command prompt.
    * Ensure you have Python 3.7 or later installed.
    * Install FastAPI and Uvicorn by running:

```bash
pip install fastapi uvicorn
```

3. Run the Application:

    * In the terminal, navigate to the directory containing main.py.
    * Start the FastAPI server with:

```bash
uvicorn main:app --reload
```

    * You should see output indicating that the server is running at http://127.0.0.1:8000.

1. Test the Endpoint:

    * Open your web browser or use a tool like curl or Postman.
    * To retrieve a user with user_id 1, navigate to:

http://127.0.0.1:8000/users/1

        * You should see a JSON response:
```json
{
"id": 1,
"name": "Alice Smith",
"email": "alice@example.com"
}
```
    * To test the 404 error handling, try accessing a non-existent user:

http://127.0.0.1:8000/users/999

        * You should receive a 404 error response:
```json
{
"detail": "User not found"
}
```


