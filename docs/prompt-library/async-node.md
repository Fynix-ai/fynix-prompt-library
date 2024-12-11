---
id: async-node
title: Handling Asynchronous Code and Promises in Node.js
sidebar_label: Asynchronous Code (Node.js)
---
## Scenario

You have a Node.js application that needs to:

1. Read the contents of a local file (data.txt) from the filesystem.
2. Fetch data from an external API `(https://jsonplaceholder.typicode.com/posts/1)`.
3. Log both the file contents and the fetched API data to the console.
4. Handle errors gracefully at each step.

You want to see this done using three approaches:

* Callbacks
* Promises
* Async/Await

After demonstrating all three approaches, you want a final version that uses async/await and is ready to run directly, so you can copy, paste, `run npm install` (if needed), and `node app.js` to see the output.

## Prompt to Use in Fynix

**Prompt:**

"Fynix, I need to handle asynchronous code in Node.js for reading a file and fetching data from an external API. I have a local file named data.txt containing some text, and I want to fetch data from https://jsonplaceholder.typicode.com/posts/1. Please show me how to do this using three approaches: callbacks, Promises (with .then()), and async/await. For each approach, handle errors (e.g., file not found, network errors).

After demonstrating the three approaches conceptually, provide a final code sample that uses async/await and error handling. The final code should:

* Read data.txt from the current directory.
* Fetch data from https://jsonplaceholder.typicode.com/posts/1.
* Log the file contents and the fetched data to the console.
* Handle any errors gracefully by logging an appropriate message.

Include all necessary imports and setup. Ensure that I can copy and paste this final async/await code into an app.js file, `run npm install` if needed, and then `node app.js` to see the output immediately.“

## Example of the Final Async/Await Code (What Fynix Should Produce)

```js
// app.js
// Final async/await version with error handling and direct run capability

const fs = require('fs').promises;
const fetch = require('node-fetch'); // Make sure to `npm install node-fetch`

async function main() {
  try {
    // Read the file asynchronously
    const fileData = await fs.readFile('./data.txt', 'utf8');

    // Fetch data from external API
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }
    const apiData = await response.json();

    // Log the results
    console.log('File Contents:', fileData);
    console.log('API Data:', apiData);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
```

**Instructions:**

1. Ensure you have a file named data.txt in the same directory as app.js. For example, data.txt could contain:
```
Hello, this is some sample text.
```

2. Run:

```bash
npm init -y
npm install node-fetch
node app.js
```

3. You should see the file contents and the fetched API data logged to the console. If any errors occur (e.g., no file found or network issues), an appropriate error message will be displayed.

