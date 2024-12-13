---
id: caching-redis
title: Implementing Caching Mechanisms with Redis
sidebar_label: Caching with Redis
---
## Prompt Template

"I need to implement caching in my **[Language/Framework]** application using Redis to improve performance. The application [describe its functionality, e.g., fetches data from an external API]. I want to:

* Cache **[Type of Data to Cache]** in Redis when it's fetched.
* Set an expiration time of **[Time Duration, e.g., 15 minutes]** for the cached data.
* Modify the **[Function Name]** function to first check Redis for cached data before making an API call.
* Handle cache misses by fetching from the external API and storing the result in Redis.
* Use the **[Redis Client Library]** for Redis interactions.

Please provide the complete **[Language]** code for the updated **[Function Name]** function, including Redis client setup and any necessary imports. Ensure that the code can be integrated directly into my application.“

## Prompt Example

"Using Python, FastAPI, and Redis, create an API endpoint that fetches product details by product_id. Simulate a slow database call by adding a delay when fetching data. Implement Redis caching so that:

1. The first request for a product_id fetches data from the simulated database (with delay) and stores it in Redis.
2. Subsequent requests for the same product_id retrieve data from Redis without delay.
3. Include a cache expiration time of 60 seconds for each cached item.

Provide all necessary code, including setting up the FastAPI application, Redis client, and instructions on how to run the application and test the caching mechanism.“

## Expected Output

```python
# Install dependencies first:
# pip install fastapi uvicorn redis asyncio

from fastapi import FastAPI
import redis
import asyncio
import json
from time import time

app = FastAPI()

# Initialize Redis client
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Simulated database
async def get_product_from_db(product_id):
    # Simulate a slow database call
    await asyncio.sleep(2)  # 2-second delay
    # Simulated product data
    product_data = {
        "product_id": product_id,
        "name": f"Product {product_id}",
        "price": 99.99,
        "description": "This is a sample product."
    }
    return product_data

@app.get("/products/{product_id}")
async def get_product(product_id: int):
    cache_key = f"product:{product_id}"
    start_time = time()

    # Try to get data from Redis cache
    cached_data = redis_client.get(cache_key)
    if cached_data:
        product = json.loads(cached_data)
        source = "Redis Cache"
    else:
        # Fetch data from simulated database
        product = await get_product_from_db(product_id)
        # Store data in Redis cache with expiration time of 60 seconds
        redis_client.setex(cache_key, 60, json.dumps(product))
        source = "Database"

    end_time = time()
    response_time = end_time - start_time

    return {
        "source": source,
        "response_time": f"{response_time:.4f} seconds",
        "product": product
    }

# To run the app:
# Save this code in a file named main.py
# Ensure Redis server is running on localhost:6379
# Run the app with the command:
# uvicorn main:app --reload
```


## Instructions to Run and See Output

1. Prerequisites:

    * Python installed (version 3.7 or above).
    * Redis server installed and running on localhost port 6379.

2. Install Dependencies:

    * Open your terminal or command prompt.
    * Install FastAPI, Uvicorn, Redis, and Asyncio:

```bash
pip install fastapi uvicorn redis asyncio
```

3. Set Up Redis Server:

    * If you don't have Redis installed, download it from the official website and follow the installation instructions.
    * Start the Redis server:
        * On Linux or macOS:

```bash
redis-server
```

4. Save the Code:

    * Create a new file named main.py.
    * Copy the provided code and paste it into main.py.

5. Run the FastAPI Application:

    * In the terminal, navigate to the directory containing main.py.
    * Start the server with:


```bash
uvicorn main:app --reload
```

6. Test the Endpoint and Observe Caching:

    * Open another terminal window or use a tool like curl, HTTPie, or a REST client like Postman.
    * First Request (cache miss, data fetched from the database):


```bash
curl -X GET "http://127.0.0.1:8000/products/1"
```


        * Expected Output (response time around 2 seconds):

```
{
"source": "Database",
"response_time": "2.0021 seconds",
"product": {
"product_id": 1,
"name": "Product 1",
"price": 99.99,
"description": "This is a sample product."
}
}
```


    * Second Request (cache hit, data fetched from Redis):


```
curl -X GET "http://127.0.0.1:8000/products/1"
```

        * Expected Output (response time significantly less):


```
{
"source": "Redis Cache",
"response_time": "0.0005 seconds",
"product": {
"product_id": 1,
"name": "Product 1",
"price": 99.99,
"description": "This is a sample product."
}
}
```


    * Test Cache Expiration:
        * Wait for 60 seconds (cache expiration time).
        * Make the request again to see data fetched from the database due to cache expiration.

