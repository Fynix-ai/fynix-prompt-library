---
id: docker-harbor
title: Managing Docker Images and Registries with Harbor
sidebar_label: Docker Registries (Harbor)
---

## Prompt Template:
"Fynix, I need to build and push a Docker image of my **[Language/Framework]** application to a Harbor registry. Specifically:

1. Build a Docker image from my **[Application Type, e.g., Node.js/Java/Python]** application code.
2. Tag the image using the Harbor registry URL **harbor.example.com/[project]/[repository]:[tag]**.
3. Log in to Harbor using docker login and push the image.
4. Verify that the image is available in Harbor.

Please provide the complete code for the **[Application File and Dockerfile]**, and list the steps and commands to build, run, and push the Docker image. Ensure that the code and instructions can be copied and pasted to run immediately.“


## Scenario
You have a simple Node.js application that serves a "Hello World" message, and you want to:

1. Containerize the Application: Create a Docker image of the Node.js application.
2. Use Harbor as a Registry: Push the created image to your Harbor registry.
3. Manage Versions and Updates: Tag and push new versions of the image as the application evolves.

**Assumptions:**

* You have Docker installed and running on your machine.
* You have access to a Harbor registry at harbor.example.com with a project named myproject.
* You have Harbor credentials (username/password) with push privileges to the myproject project.
* Node.js is installed locally (to test the application before containerizing).


**Project Structure**

```
node-hello-world/
├── server.js
└── Dockerfile
```


## Prompt to Use in Fynix

"Fynix, I need to containerize my Node.js application and push it to a Harbor registry. Specifically

1. Create a simple Node.js web server that returns "Hello, World!" at the root path (/).
2. Write a Dockerfile to build a Docker image of the application.
3. Tag the image using the Harbor registry URL harbor.example.com/myproject/node-hello-world:1.0.
4. Provide instructions to:

    * Log in to Harbor using docker login.
    * Build the Docker image.
    * Push the image to Harbor.

5. Ensure the code is ready to run as-is, and I can copy and paste the instructions to see output.

Please provide the complete server.js file, the Dockerfile, and all necessary commands so I can run the application locally, build the image, and push it to Harbor.“


## Expected Output from Fynix

**server.js (Node.js Application):**

```js
// server.js
const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```


**Dockerfile (Build Instructions for the Docker Image):**

```
# Dockerfile

FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json if needed
# In this simple example, we have no dependencies, so we skip that step.

# Copy the source code
COPY server.js /app/

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
```

## Instructions to Run and See Output

1. **Set Up the Project Files:**

    * Create a directory named node-hello-world.
    * Save server.js and Dockerfile inside this directory as shown in the project structure.

2. **Test the Application Locally (Optional):**

    * Run node server.js inside the node-hello-world directory:

```bash
node server.js
```

    * Open your browser and navigate to http://localhost:3000 to see the "Hello, World!" message.
    * Press Ctrl+C to stop the server.

3. **Build the Docker Image:**

    * Navigate to the node-hello-world directory:

```bash
cd node-hello-world
```

    * Build the Docker image:

```bash
docker build -t harbor.example.com/myproject/node-hello-world:1.0 .
```

    * This command will create a Docker image tagged as harbor.example.com/myproject/node-hello-world:1.0.

4. Run the Docker Image Locally (Optional):

    * Run the container:

```bash
docker run -p 3000:3000 harbor.example.com/myproject/node-hello-world:1.0
```

    * Open http://localhost:3000 in your browser, and you should see "Hello, World!" served by the containerized application.
    * Press Ctrl+C to stop the container.

5. Log in to Harbor:

    * Log in to your Harbor registry using your credentials:

```bash
docker login harbor.example.com
```

    * When prompted, enter your username and password.

6. Push the Image to Harbor:

    * Once logged in successfully, push the image:

```bash
docker push harbor.example.com/myproject/node-hello-world:1.0
```

    * The image will be uploaded to the myproject project in Harbor.

7. Verify in Harbor:

    * Go to your Harbor web UI at https://harbor.example.com/.
    * Log in and navigate to the myproject project.
    * You should see the node-hello-world repository with the 1.0 tag.
    * 

