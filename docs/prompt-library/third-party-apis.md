---
id: third-party-apis
title: Integrating Third-Party APIs
sidebar_label: Third-Party APIs
---
## Prompt Template:
"Fynix, I need to integrate **[Third-Party API]** into my **[language/framework]** application to **[describe functionality]**. I want to:

1. **[First requirement]**
2. **[Second requirement]**
3. **[Third requirement]**
4. Handle errors such as **[list possible errors]**.
5. Use best practices for asynchronous requests, such as using **[async/await/Promises]**.

Can you provide the complete code that achieves this functionality? Please include any instructions needed to run the application, and make sure the code can be copied and pasted to run immediately.“

## Scenario

You are building a Node.js application that needs to fetch data from an external API and display it to the user. Specifically, you want to:

1. Integrate with the OpenWeatherMap API to fetch current weather data for a given city.
2. Handle API responses, including successful data retrieval and error conditions (e.g., invalid API key, city not found).
3. Implement error handling to manage exceptions and provide meaningful feedback.



**Project Structure**

```
weather-app/
├── app.js
├── package.json
```


## Prompt to Use in Fynix

"Fynix, I need to integrate the OpenWeatherMap API into my Node.js application to fetch and display current weather data for a given city. I want to:

1. Make an HTTP GET request to the OpenWeatherMap API's current weather endpoint.
2. Handle successful responses by parsing and displaying the temperature and weather description.
3. Handle errors such as invalid API key, city not found, and network issues.
4. Use best practices for asynchronous requests, such as using `async/await` or Promises.
5. Ensure the code is clean, well-documented, and includes necessary imports.

Can you provide the complete app.js code that achieves this functionality? Please include any instructions needed to run the application, and make sure the code can be copied and pasted to run immediately."


## Expected Output from Fynix

**package.json**

First, create a package.json file to manage dependencies:

```json
{
  "name": "weather-app",
  "version": "1.0.0",
  "description": "Node.js application to fetch weather data from OpenWeatherMap API",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "axios": "^0.27.2"
  }
}
```

**app.js**

```js
// app.js

const axios = require('axios');

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
const CITY = 'London';
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

async function getWeatherData() {
  try {
    const response = await axios.get(URL);
    const data = response.data;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    console.log(`Current weather in ${CITY}:`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Description: ${description}`);
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with a status code outside of 2xx
      if (error.response.status === 401) {
        console.error('Invalid API key. Please check your API key and try again.');
      } else if (error.response.status === 404) {
        console.error('City not found. Please check the city name and try again.');
      } else {
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      }
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server. Please check your network connection.');
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
  }
}

getWeatherData();
```

## Instructions to Run and See Output

1. **Obtain an OpenWeatherMap API Key**

    * Sign up for a free account at OpenWeatherMap.
    * Obtain your API key from your account dashboard.

2. **Set Up the Project**
     * Create a new directory for the project and navigate into it:

```bash
mkdir weather-app
cd weather-app
```

    * Create the package.json file:

```bash
echo '{}' > package.json
```

    * Alternatively, you can initialize npm and then edit the package.json:

```bash
npm init -y
```

    * Copy and paste the provided package.json content into your package.json file.

3. **Install Dependencies**

    * Install the axios library:

```bash
npm install axios
```

4. **Create the app.js File**

    * Create a file named app.js:
```bash
touch app.js
```


    * Copy and paste the provided app.js code into the file.
    * Replace the API Key:
        * Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual OpenWeatherMap API key.
    * (Optional) Change the CITY variable to the city you want to get the weather for.

5. Run the Application

    * In the terminal, run:

```bash
node app.js
```

    Expected Output (assuming the city is valid and the API key is correct):

```
Current weather in London:
Temperature: 15°C
Description: scattered clouds
```

    * If there is an error (e.g., invalid API key or city not found), the error message will be displayed accordingly.



*Note:* Remember to replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key.
