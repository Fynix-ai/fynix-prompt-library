---
id: concurrency-asyncio
title: Dealing with Concurrency in Python (Asyncio)
sidebar_label: Concurrency (Python Asyncio)
---
## Prompt Template:
"Fynix, I need to handle multiple I/O-bound tasks concurrently in my **[Programming Language]** application using **[Concurrency Library/Framework]**. Specifically:

1. **[Task 1 Description]**

    * **[Sub-requirement A]**
    * **[Sub-requirement B]**

2. **[Task 2 Description]**

    * **[Sub-requirement A]**
    * **[Sub-requirement B]**

3. Error Handling:

    * **[Describe how to handle errors]**

4. Performance Measurement:

    * **[Describe what to measure and how]**

Please provide the complete code, including all necessary imports and setup, to implement this functionality. Ensure that the code can be copied and pasted to run immediately.“


## Scenario

You are developing a Python application that needs to perform multiple I/O-bound operations, such as fetching data from multiple APIs concurrently. Currently, these operations are handled synchronously, leading to increased execution time. You want to refactor the code to use asynchronous programming with asyncio and aiohttp to enhance performance.

**Tasks:**

1. Fetch Data Concurrently: Modify the application to fetch data from multiple APIs concurrently.
2. Handle Responses: Process the responses asynchronously.
3. Error Handling: Implement proper error handling for failed requests.
4. Performance Measurement: Compare the execution time before and after implementing asyncio.

**Project Structure**

```
asyncio-example/
├── app.py
└── requirements.txt
```

## Prompt to Use in Fynix
"Fynix, I need to optimize my Python application to handle multiple I/O-bound tasks concurrently using asyncio and aiohttp. Specifically:

1. Fetch Data Concurrently:

    * Modify the fetch_data function to fetch data from three different APIs concurrently.
    * APIs to use for testing:
        * https://jsonplaceholder.typicode.com/posts/1
        * https://jsonplaceholder.typicode.com/posts/2
        * https://jsonplaceholder.typicode.com/posts/3

2. Handle Responses:

    * Process each response by extracting the title and body fields.
    * Print the extracted information to the console.

3. Error Handling:

    * Implement error handling to catch and log any exceptions that occur during the requests.
    * Ensure that one failed request does not affect the others.

4. Performance Measurement:

    * Measure and print the total execution time before and after implementing asyncio to demonstrate the performance improvement.

Please provide the complete app.py code, including all necessary imports and the asynchronous implementation. Also, include the requirements.txt file with the required dependencies. Ensure that the code can be copied and pasted to run immediately.“


## Expected Output from Fynix

**requirements.txt**
```
aiohttp==3.8.4
async-timeout==4.0.2
```

**app.py**
```python
# app.py

import asyncio
import aiohttp
import time

async def fetch(session, url):
    try:
        async with session.get(url) as response:
            response.raise_for_status()  # Raise exception for HTTP errors
            data = await response.json()
            title = data.get('title', 'No Title')
            body = data.get('body', 'No Body')
            print(f"Title: {title}\nBody: {body}\n")
    except aiohttp.ClientError as e:
        print(f"Request failed for {url}: {e}")

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.create_task(fetch(session, url))
            tasks.append(task)
        await asyncio.gather(*tasks)

def main():
    urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ]

    print("Starting synchronous fetch...\n")
    start_time = time.time()
    # Synchronous version
    import requests
    for url in urls:
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            title = data.get('title', 'No Title')
            body = data.get('body', 'No Body')
            print(f"Title: {title}\nBody: {body}\n")
        except requests.RequestException as e:
            print(f"Request failed for {url}: {e}")
    end_time = time.time()
    print(f"Synchronous fetch completed in {end_time - start_time:.2f} seconds\n")

    print("Starting asynchronous fetch...\n")
    start_time = time.time()
    # Asynchronous version
    asyncio.run(fetch_all(urls))
    end_time = time.time()
    print(f"Asynchronous fetch completed in {end_time - start_time:.2f} seconds")

if __name__ == "__main__":
    main()
```

## Instructions to Run and See Output

1. **Set Up the Project**

    * Create the Project Directory

```bash
mkdir asyncio-examplecd asyncio-example
```

    * Create requirements.txt
        Create a file named requirements.txt and paste the provided dependencies:

```
echo "aiohttp==3.8.4
async-timeout==4.0.2" > requirements.txt
```

    * Create app.py
        Create a file named app.py and paste the provided code:

```bash
touch app.py
```

Open app.py in your preferred editor and paste the code.

2. **Install Dependencies**

Ensure you have Python 3.7 or higher installed. Then, install the required packages:

```bash
pip install -r requirements.txt
```

3. **Run the Application**

Execute the app.py script:

```bash
python app.py
```

4. **Expected Output**

The application will perform both synchronous and asynchronous fetches, displaying the titles and bodies of the posts along with the execution times. Example output:

```
Starting synchronous fetch...
Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderitBody: quia et suscipit
suscipit recusandae consequuntur expedita et cum
reprehenderit molestiae ut ut quas totam
nostrum rerum est autem sunt rem eveniet architecto
Title: qui est esseBody: est rerum tempore vitae
sequi sint nihil reprehenderit dolor beatae ea dolores neque
fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
qui aperiam non debitis possimus qui neque nisi nulla
Title: ea molestias quasi exercitationem repellat qui ipsa sit autBody: et iusto sed quo iure
voluptatem occaecati omnis eligendi aut ad
voluptatem doloribus vel accusantium quis pariatur
molestiae porro eius odio et labore et velit aut

Synchronous fetch completed in 0.35 seconds

Starting asynchronous fetch...
Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderitBody: quia et suscipit
suscipit recusandae consequuntur expedita et cum
reprehenderit molestiae ut ut quas totam
nostrum rerum est autem sunt rem eveniet architecto
Title: qui est esseBody: est rerum tempore vitae
sequi sint nihil reprehenderit dolor beatae ea dolores neque
fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
qui aperiam non debitis possimus qui neque nisi nulla
Title: ea molestias quasi exercitationem repellat qui ipsa sit autBody: et iusto sed quo iure
voluptatem occaecati omnis eligendi aut ad
voluptatem doloribus vel accusantium quis pariatur
molestiae porro eius odio et labore et velit aut

Asynchronous fetch completed in 0.35 seconds
```

**Note:** The actual execution time may vary based on network conditions and system performance. Typically, asynchronous fetching should be faster or comparable to synchronous fetching when dealing with multiple I/O-bound tasks.



