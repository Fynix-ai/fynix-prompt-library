---
id: logs-metrics
title: Analyzing Logs and Metrics with Coralogix, Prometheus, and Grafana
sidebar_label: Logs and Metrics
---

## Prompt Template
"Fynix, I need to set up logging and metrics for my **[language/framework]** application using **[tools]**. Specifically:

1. Logging with **[Tool]**:

    * **[Describe logging requirements]**.

1. Metrics with **[Tools]**:

    * **[Describe metrics collection requirements]**.

1. Simulate an Application Issue:

    * **[Describe the issue to simulate]**.

Can you provide the necessary code, configurations, and steps to achieve this setup? Please include any required configurations and ensure that the code can be copied, pasted, and run to see the output immediately.“

## Scenario

You have a Node.js application running with Docker, and you want to monitor its logs and performance metrics to diagnose and fix issues. You plan to:


1. Set up logging with Coralogix to collect and analyze application logs.
2. Monitor metrics using Prometheus and visualize them with Grafana.
3. Simulate an application issue to demonstrate how logs and metrics can help in diagnosing and fixing the problem.


**Project Structure**

```
node-app/
├── app.js
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Prompt to Use in Fynix
"Fynix, I need to set up logging and metrics collection for my Node.js application using Coralogix, Prometheus, and Grafana. Specifically:

1. **Logging with Coralogix:**

    * Integrate Coralogix into my Node.js application (app.js) to send logs to Coralogix.
    * Use the Coralogix Node.js SDK.

2. **Metrics with Prometheus and Grafana:**

    * Expose application metrics using the prom-client library.
    * Set up Prometheus to scrape metrics from the application.
    * Configure Grafana to visualize the metrics from Prometheus.

3. **Simulate an Application Issue:**

    * Introduce an intentional error or performance issue in the application.
    * Demonstrate how to use logs and metrics to diagnose and fix the issue.

Can you provide the necessary code, configurations, and steps to achieve this setup? Please include any required Docker configurations and ensure that the code can be copied, pasted, and run to see the output immediately.“


## Expected Output from Fynix

**Step-by-Step Guide to Setting Up Logging and Metrics**

**Prerequisites**

* Coralogix Account: Sign up at Coralogix to obtain your Private Key and App Name.
* Docker and Docker Compose installed on your machine.
* Node.js installed (optional, since we'll use Docker).

1. **Set Up the Node.js Application**

**package.json**

```json
{
  "name": "node-app",
  "version": "1.0.0",
  "description": "Node.js application with logging and metrics",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "coralogix-logger": "^2.0.13",
    "express": "^4.17.1",
    "prom-client": "^14.0.1"
  }
}
```

**app.js**
```js
// app.js

const express = require('express');
const Coralogix = require('coralogix-logger');
const client = require('prom-client');

const app = express();
const port = 3000;

// Configure Coralogix logger
const coralogixConfig = new Coralogix.CoralogixLogger.Config({
  privateKey: 'YOUR_CORALOGIX_PRIVATE_KEY',
  applicationName: 'MyApp',
  subsystemName: 'Subsystem'
});

Coralogix.CoralogixLogger.configure(coralogixConfig);

const logger = new Coralogix.CoralogixLogger('Category');

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
  name: 'node_app_requests_total',
  help: 'Total number of requests received'
});

const histogram = new client.Histogram({
  name: 'node_app_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  buckets: [0.1, 0.5, 1, 1.5, 2, 5]
});

// Simulate an intentional error
app.get('/error', (req, res) => {
  logger.error('An intentional error occurred');
  throw new Error('Intentional error for testing');
});

app.get('/', (req, res) => {
  const start = Date.now();
  counter.inc();

  // Simulate a performance issue
  const delay = Math.random() * 1000;
  setTimeout(() => {
    res.send('Hello, World!');
    const duration = (Date.now() - start) / 1000;
    histogram.observe(duration);
    logger.info(`Request handled in ${duration} seconds`);
  }, delay);
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  console.log(`Server is running on http://localhost:${port}`);
});
```

**Note:** Replace 'YOUR_CORALOGIX_PRIVATE_KEY' with your actual Coralogix Private Key.


2. **Create Docker Configuration**

**Dockerfile**


# Dockerfile
```
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
```

**docker-compose.yml**
```
# docker-compose.yml

version: '3.8'

services:
  node-app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    ports:
      - '9090:9090'

  grafana:
    image: grafana/grafana
    ports:
      - '3001:3000'
```

**prometheus.yml**
```
# prometheus.yml

global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'node-app'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['node-app:3000']
```

3. **Run the Application and Services**

    Create the Project Directory

```bash
    mkdir node-app
    cd node-app
```
    2. Copy the Files

        * Place package.json, app.js, Dockerfile, and docker-compose.yml in the node-app directory.
        * Create prometheus.yml and place it in the node-app directory.

    3. Build and Run the Services
```bash
    docker-compose up -d
```
    This command will build the Node.js application image and start the node-app, prometheus, and grafana services.



    4. Access the Application and Simulate Issues

        * Access the Application
            * Visit http://localhost:3000 in your browser.
            * The application should respond with "Hello, World!".
        * Simulate an Error
            * Visit http://localhost:3000/error to trigger the intentional error.
            * The application will throw an error and respond with "Internal Server Error".

    5. Access Prometheus and Grafana

        * Prometheus
            * Visit http://localhost:9090 to access the Prometheus web interface.
            * You can query metrics like node_app_requests_total.
        * Grafana
            * Visit http://localhost:3001 to access Grafana.
            * Default credentials are admin / admin.
            * Add Prometheus as a data source:
                * URL: http://prometheus:9090
            * Create a dashboard to visualize the metrics.

    6. View Logs in Coralogix

        * Coralogix Dashboard
            * Log in to your Coralogix account.
            * Navigate to the Logs section to view the logs sent from the application.
            * You should see logs for info messages and errors, including the intentional error you triggered.



    7. Diagnose and Fix the Issue

        * Analyzing Logs
            * In Coralogix, locate the error log for the intentional error.
            * The log message should indicate where the error occurred.
        * Analyzing Metrics
            * In Grafana, create a graph to visualize node_app_request_duration_seconds.
            * Observe any spikes in request durations, indicating performance issues.
        * Fixing the Issue
            * Modify app.js to fix the intentional error or optimize performance.
            * For example, remove the intentional error route or optimize the delay logic.



**Note:** Remember to replace 'YOUR_CORALOGIX_PRIVATE_KEY' with your actual private key from Coralogix.
