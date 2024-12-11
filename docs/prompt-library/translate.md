---
id: translate
title: Code Translation
sidebar_label: Translate
---
1. **Design Pattern Translation**

**Template:**

`/translate` the following **[source language]** implementation of the **[design pattern]** into **[target language]** while maintaining its functionality:

**[code snippet]** 


**Example:**

* "`/translate` the following Python implementation of the Observer design pattern into Java: 

```
class Subject:  
    def __init__(self):  
        self.observers = []  
    def register(self, observer):  
        self.observers.append(observer)  
    def notify(self):  
        for obs in self.observers:  
            obs.update()  
```"
```


2. **Data Processing Pipeline Conversion**

**Template:**

`/translate `the following **[source language]** data processing pipeline into **[target language]** with equivalent steps and functionality:

**[code snippet]** 


**Example:**

* "`/translate` the following Python pandas data pipeline into Node.js: 

```
import pandas as pd  
df = pd.read_csv("data.csv")  
df = df[df['age'] > 18]  
df['salary'] = df['salary'] * 1.1  
print(df.head())  
```"
```


3. **Database Code Migration**

**Template:**

`/translate` to migrate the following [source language] code that interacts with a [database/service] into [target language] with appropriate database or service libraries:

**[code snippet]**



**Example:**

* "`/translate` to migrate this Java MySQL database query code into Python using the sqlite3 library: 

```
Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db", "user", "password");  
Statement stmt = conn.createStatement();  
ResultSet rs = stmt.executeQuery("SELECT * FROM users");  
while (rs.next()) {  
    System.out.println(rs.getString("name"));  
}  
```"
```


4. **Data Structure Translation**

**Template:**

`/translate` the following [source language] implementation of [data structure] in [target language] while preserving equivalent functionality and performance:

**[code snippet]** 


`Example:`

* "`/translate` this Python implementation of a stack using a list into Go: 

```
class Stack:  
    def __init__(self):  
        self.items = []  
    def push(self, item):  
        self.items.append(item)  
    def pop(self):  
        return self.items.pop()  
```"
```

5. **Framework or Library Adaptation**

**Template:**

`/translate` the following [source language] code snippet to [target language] while adhering to **[framework/library name]** conventions:

**[code snippet]** 


**Example:**

* "`/translate` this Express.js API endpoint in Node.js to Spring Boot in Java: 

```
const express = require('express');  
const app = express();  
app.get('/users', (req, res) => {  
    res.json({ message: 'User list' });  
});  
```"
```


6. **Method or Function Conversion**

**Template:**

`/translate` the following **[source language]** function/method that performs **[specific task]** into **[target language]**:

**[code snippet]**  


**Example:**

* "`/translate` the following Python function for calculating factorial into C#: 

```
def factorial(n):  
    if n == 0:  
        return 1  
    return n * factorial(n-1)  
```"
```


7. **Error Handling Adaptation**

**Template:**

`/translate` the following **[source language]** error handling logic into **[target language]** using its native exception or error management system:

**[code snippet]**  



**Example:**

* "`/translate` this Python error handling code into Java: 
```
try:  
    result = 10 / 0  
except ZeroDivisionError:  
    print('Cannot divide by zero')  
```"
```

8. **Scripting to OOP Migration**

**Template:**

`/translate` the following procedural [source language] script into an object-oriented implementation in **[target language]**:

**[code snippet]** 


**Example:**

* "`/translate` this Python script for user authentication into an OOP version in C#: 

```
def authenticate(user, password):  
    if user == 'admin' and password == 'password':  
        return True  
    return False  
```"
```


9. **API Client Translation**

**Template:**

`/translate` the following **[source language]** API client code into **[target language]** while ensuring proper HTTP request handling:

**[code snippet]** 



**Example:**

* "`/translate` this Python requests API client code into Node.js using axios: 

```
import requests  
response = requests.get('https://api.example.com/users')  
print(response.json())  
```"
```


10. **Code for Multithreading/Concurrency**

**Template:**

`/translate` the following **[source language]** multithreading or concurrency code into **[target language]**, preserving its parallel processing behavior:

**[code snippet]** 



**Example:**

* "`/translate` this Java multithreading code into Python using concurrent.futures: 

```
ExecutorService executor = Executors.newFixedThreadPool(2);  
executor.submit(() -> System.out.println("Task 1"));  
executor.submit(() -> System.out.println("Task 2"));  
```"
```

