---
id: new-project-scaffolding
title: New Project Scaffolding
sidebar_label: Project Scaffolding
---
1. **Web Application Scaffold**

**Template:**

``/new`` **[project type]** web application in **[language]** using the **[framework]** framework. Include the basic folder structure, configuration files, and essential boilerplate code


**Example:**

`/new` e-commerce web application in JavaScript using the Express.js framework. Include the basic folder structure, package.json, and essential boilerplate code to handle routing

```
└── ecommerce-app
     └── package.json
     └── server.js
     └── routes
          ├── index.js
     └── controllers
          ├── productController.js
     └── models
          ├── productModel.js
     └── views
          ├── index.html
     └── public
          └── css
               ├── styles.css
          └── js
               └── main.js

Create Workspace
```

2. **RESTful API Service Setup**

**Template:**

Initialize a `/new` RESTful API service in **[language]** using the **[framework]** framework. Provide the standard project structure, necessary dependencies, and boilerplate code for handling basic CRUD operations


**Example:**

Initialize a `/new` RESTful API service in Python using the Flask framework. Provide the standard project structure, requirements.txt, and boilerplate code for handling basic CRUD operations for a "Product" resource

```
└── flask_app
     ├── __init__.py
     ├── app.py
     ├── models.py
     ├── routes.py
     ├── config.py
└── instance
     ├── config.py
└── requirements.txt

Create Workspace
```

3. **Mobile Application Framework Setup**

**Template:**

Set up a `/new` **[platform]** mobile application in **[language]** using the **[framework]** framework. Include the initial project structure, configuration files, and basic UI components


**Example:**

Set up a `/new` iOS mobile application in Swift using the SwiftUI framework. Include the initial project structure, Info.plist, and basic UI components

```
└── MySwiftUIApp
     └── MySwiftUIApp.xcodeproj
     └── MySwiftUIApp
          └── ContentView.swift
          └── MySwiftUIAppApp.swift
          └── Info.plist

Create Workspace
```


4. **Microservices Architecture Scaffold**

**Template:**

Create a `/new` **[service type]** microservice in **[language]** using the **[framework]** framework. Provide the essential project structure, configuration for inter-service communication, and boilerplate code for basic service functionality


**Example:**

Create a `/new` User Management microservice in Go using the Gin framework. Provide the essential project structure, configuration for REST API communication, and boilerplate code for basic service functionality


```
└── user-management-service
     └── main.go
     └── config
          ├── config.go
     └── controllers
          ├── user_controller.go
     └── models
          ├── user.go
     └── routes
          ├── routes.go
     └── utils
          ├── utils.go
     └── .env
     └── go.mod
     └── go.sum
     └── Dockerfile
     └── .gitignore

Create Workspace
```


5. **Front-End Project Initialization**

**Template:**

`/new` **[type]** front-end project in **[language]** using the **[framework/library]**. Include the basic directory structure, configuration files, and starter components


**Example:**

`/new` Single Page Application (SPA) front-end project in TypeScript using the React library. Include the basic directory structure, tsconfig.json, and starter components

```
└── src
     ├── components
     │    ├── Header.tsx
     │    ├── Footer.tsx
     │    ├── Home.tsx
     ├── styles
     │    ├── App.css
     ├── index.tsx
     ├── App.tsx
     ├── react-app-env.d.ts
└── public
     ├── index.html
└── tsconfig.json
└── package.json

Create Workspace
```

6. **Command-Line Application Scaffold**

**Template:**

`/new `**[type]** command-line application in **[language]**. Include the basic project structure, necessary dependencies, and boilerplate code for parsing command-line arguments and executing commands


**Example:**

`/new` CLI tool in Python. Include the basic project structure, requirements.txt, and boilerplate code for parsing command-line arguments using argparse

```
└── cli_tool
     └── main.py
     └── requirements.txt
     └── __init__.py

Create Workspace
```


7. **Full-Stack Application Boilerplate**

**Template:**

``/new`` full-stack application in **[language]** using **[frontend framework]** for the front-end and **[backend framework]** for the back-end. Include the initial project structure, configuration files, and boilerplate code for basic interaction between front-end and back-end


**Example:**

`/new` full-stack application in JavaScript using React for the front-end and Node.js with Express for the back-end. Include the initial project structure, package.json, and boilerplate code for basic API interaction


```
└── client
     ├── package.json
     ├── src
     │    └── index.js
     │    └── App.js
     │    └── components
     │         └── ApiComponent.js
└── server
     └── package.json
     └── index.js
     └── routes
          ├── api.js
     └── controllers
          ├── apiController.js
     └── models
          ├── dataModel.js
     └── config
          └── db.js

Create Workspace
```


8. **API Client Library Scaffold**

**Template:**

`/new` **[language]** client library for interacting with the **[API/service]**. Include the basic project structure, configuration files, and boilerplate code for making API requests


**Example:**

`/new` Python client library for interacting with the GitHub API. Include the basic project structure, setup.py, and boilerplate code for making API requests using requests

```
└── github_client
     ├── __init__.py
     ├── github_api.py
└── setup.py
└── README.md
└── requirements.txt

Create Workspace
```

9. **Database-Integrated Project Scaffold**

**Template:**

`/new` **[language]** project integrated with a [database type] database. Include the project structure, configuration files for database connections, and boilerplate code for basic CRUD operations


**Example:**

`/new` C# project integrated with a SQL Server database. Include the project structure, appsettings.json for database connections, and boilerplate code using Entity Framework Core for basic CRUD operations


```
└── MyApp
     └── MyApp.csproj
     └── appsettings.json
     └── Models
          ├── MyEntity.cs
     └── Data
          ├── ApplicationDbContext.cs
     └── Repositories
          ├── IMyEntityRepository.cs
          ├── MyEntityRepository.cs
     └── Program.cs
     └── Startup.cs

Create Workspace
```


10. **Testing Framework Integration Scaffold**

**Template:**

`/new` **[language]** project with integrated **[testing framework]**. Include the project structure, configuration files, and boilerplate code for writing and running unit tests:


**Example:**

`/new` Java project integrated with the JUnit 5 testing framework. Include the project structure, pom.xml for Maven dependencies, and boilerplate code for writing and running unit tests


```
└── java-project
     └── pom.xml
     └── src
          └── main
               ├── java
               │    └── com
               │         └── example
               │              └── App.java
          └── test
               └── java
                    └── com
                         └── example
                              └── AppTest.java

Create Workspace
```
