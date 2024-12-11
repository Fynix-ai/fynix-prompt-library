---
id: complex-sql
title: Writing Complex SQL Queries
sidebar_label: Complex SQL Queries
---

## Prompt Template:
"I need to write a complex SQL query for a [Database System] database. The database has the following tables:

* **[Table 1 Name]**:
    * **[Column 1 Details]**
    * **[Column 2 Details]**
    * **[... Additional Columns]**
* **[Table 2 Name]**:
    * **[Column 1 Details]**
    * **[Column 2 Details]**
    * **[... Additional Columns]**

I need to:

1. **[First Requirement]**
2. **[Second Requirement]**
3. **[Third Requirement]**
4. **[... Additional Requirements]**

Please provide the SQL query that accomplishes this, ensuring it is optimized for performance.“



## Prompt Example

"Using PostgreSQL, generate SQL scripts to:

1. Create two tables: employees and departments.

    * employees table should have employee_id (primary key), name, department_id (foreign key), and salary.
    * departments table should have department_id (primary key) and department_name.

1. Insert sample data into both tables:

    * At least 4 departments (e.g., 'HR', 'Engineering', 'Marketing', 'Sales').
    * At least 8 employees with varying salaries and associated departments.

1. Write a complex SQL query to:

    * Retrieve the names of departments where the average salary of employees is higher than the overall average salary across all departments.
    * Include the average salary of each department in the results.

Ensure the script includes all necessary SQL commands to create the tables, insert data, and execute the query so that it can be run directly in PostgreSQL to see the results.“

## Generated SQL Script example:

```sql
-- Create departments table
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

-- Create employees table
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id),
    salary DECIMAL(10, 2) NOT NULL
);

-- Insert sample data into departments
INSERT INTO departments (department_name) VALUES
('HR'),
('Engineering'),
('Marketing'),
('Sales');

-- Insert sample data into employees
INSERT INTO employees (name, department_id, salary) VALUES
('Alice', 1, 50000.00),
('Bob', 2, 80000.00),
('Charlie', 2, 90000.00),
('Diana', 3, 60000.00),
('Edward', 3, 65000.00),
('Fiona', 4, 55000.00),
('George', 4, 70000.00),
('Hannah', 4, 72000.00);

-- Complex SQL query to retrieve departments with average salary higher than overall average
WITH overall_avg AS (
    SELECT AVG(salary) AS avg_salary FROM employees
)
SELECT d.department_name, AVG(e.salary) AS department_avg_salary
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
HAVING AVG(e.salary) > (SELECT avg_salary FROM overall_avg);
```

## Expected Result

```
 department_name | department_avg_salary
-----------------+-----------------------
 Engineering     |             85000.00
 Sales           |             65666.67
```

## Instructions to Run and See Output

1. Set Up PostgreSQL Environment:

    * Ensure that PostgreSQL is installed on your system.
    * Open the PostgreSQL command-line interface (psql) or a PostgreSQL client tool like pgAdmin.

2. Create a New Database (Optional):

    * To keep the environment clean, you can create a new database:

CREATE DATABASE testdb;
\c testdb

3. Copy and Paste the SQL Script:

    * Copy the entire SQL script provided above.
    * Paste it into your PostgreSQL client and execute it.

4. View the Results:

    * The result of the complex SQL query will display the department names and their average salaries for departments where the average salary exceeds the overall average.

Expected Result:

```
 department_name | department_avg_salary-----------------+-----------------------
 Engineering     |             85000.00
 Sales           |             65666.67
```

