---
id: optimize-mongodb
title: Optimizing MongoDB Queries
sidebar_label: MongoDB Queries
---

## Prompt Template

"Using **[Programming Language]** with the **[MongoDB Driver/Library]**, optimize a query on a **[Collection Name]** collection in a MongoDB database. The collection contains documents with the following schema:

```
{
  **[Field 1]: [Type],**
  **[Field 2]: [Type],**
  **[... Additional Fields]**
}
```

**Tasks:**

1. Insert **[Number]** sample documents with random data for testing.
2. Write a query to [Describe the Query Objective].
3. Optimize the query by **[Optimization Techniques, e.g., creating indexes]**.
4. Measure and output the query execution time before and after optimization.

Provide all the necessary **[Programming Language]** code, including the connection setup to a local MongoDB instance, so the code is complete and can be run directly to see the performance improvement.“


## Prompt Example

"Using Node.js with the MongoDB Node.js Driver, optimize a query on a products collection in a MongoDB database. The products collection contains documents with the following schema:

```
{
"_id": ObjectId,
"name": String,
"category": String,
"price": Number,
"ratings": Number,
"inStock": Boolean}
```

1. Create the products collection and insert 1,000 sample documents with random data for testing.
2. Write a query to find all products in the 'Electronics' category with a price less than $500 and a rating of 4 or higher.
3. Optimize the query to improve its performance, including creating necessary indexes.
4. Measure and output the query execution time before and after optimization.

Provide all the necessary Node.js code, including the connection setup to a local MongoDB instance, so that the code is complete and can be run directly to see the performance improvement.“

## Generated Code Example:


Install dependencies first:

```bash npm install mongodb faker``` 

```javascript
const { MongoClient } = require('mongodb');
const faker = require('faker');

async function run() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('testdb');
    const products = database.collection('products');

    // Drop the collection if it exists
    await products.drop().catch(() => {});

    // 1. Create the `products` collection and insert sample documents
    const sampleData = [];
    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Toys'];
    for (let i = 0; i < 1000; i++) {
      sampleData.push({
        name: faker.commerce.productName(),
        category: faker.random.arrayElement(categories),
        price: faker.commerce.price(10, 1000, 2),
        ratings: faker.datatype.number({ min: 1, max: 5 }),
        inStock: faker.datatype.boolean(),
      });
    }
    await products.insertMany(sampleData);

    // 2. Query before optimization
    console.time('Unoptimized Query');
    let results = await products.find({
      category: 'Electronics',
      price: { $lt: 500 },
      ratings: { $gte: 4 },
    }).toArray();
    console.timeEnd('Unoptimized Query');
    console.log('Number of results (unoptimized):', results.length);

    // 3. Optimize the query by creating indexes
    await products.createIndex({ category: 1, price: 1, ratings: -1 });

    // 4. Query after optimization
    console.time('Optimized Query');
    results = await products.find({
      category: 'Electronics',
      price: { $lt: 500 },
      ratings: { $gte: 4 },
    }).toArray();
    console.timeEnd('Optimized Query');
    console.log('Number of results (optimized):', results.length);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```


## Instructions to Run and See Output

1. Prerequisites:

    * Node.js installed on your machine.
    * MongoDB installed and running locally on mongodb://localhost:27017.

2. Setup the Project:

    * Create a new directory for the project and navigate into it:

```bash
mkdir mongodb-optimization-examplecd 
```

mongodb-optimization-example

    * Initialize a new Node.js project:

```bash 
npm init -y
```

    * Install the required dependencies:

```bash 
npm install mongodb faker
```

3. Copy the Code:

    * Create a new file named index.js:

```bash
touch index.js
```

    * Copy the provided code and paste it into index.js.

4. Run the Code:

    * Execute the script:
```bash
node index.js
```

    * Observe the output in the console.

5. Expected Output:

    * The script will display the execution time of the query before and after optimization, and the number of results found.
    * Example:

```
Unoptimized Query: XX.XXX ms
Number of results (unoptimized): Y
Optimized Query: X.XXX ms
Number of results (optimized): Y
```


        * You should see a significant reduction in the execution time after optimization.

