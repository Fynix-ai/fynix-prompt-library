---
id: unit-tests-backend
title: Automating Unit Test Generation for Backend Code
sidebar_label: Backend Unit Tests
---
## Scenario

You have a Python backend application with a module that contains business logic functions. You want to generate unit tests for these functions to ensure they work as expected. The project structure is as follows:

```
backend_app/
├── business_logic.py
└── tests/
└── test_business_logic.py
```

**Contents of business_logic.py:**

```python
# business_logic.py

def calculate_discount(price, customer_type):
    if customer_type == 'VIP':
        return price * 0.8  # 20% discount
    elif customer_type == 'Loyal':
        return price * 0.9  # 10% discount
    else:
        return price  # No discount

def is_eligible_for_loan(age, income, credit_score):
    if age < 18:
        return False
    if income < 20000:
        return False
    if credit_score < 600:
        return False
    return True
```


## Prompt to Use in Fynix
"Please generate unit tests for the functions calculate_discount and is_eligible_for_loan in business_logic.py. The tests should cover various scenarios, including edge cases, and use Python's built-in unittest framework. Provide assertions to verify that the functions return the expected results for different inputs. Ensure that the generated tests can be run directly and include any necessary imports."

**Tip: You can use /test instead of just writing test.**

## Expected Output from Fynix
**Contents of tests/test_business_logic.py:**

```python
# tests/test_business_logic.py

import unittest
from backend_app.business_logic import calculate_discount, is_eligible_for_loan

class TestBusinessLogic(unittest.TestCase):

    def test_calculate_discount_vip_customer(self):
        price = 100
        customer_type = 'VIP'
        expected = 80  # 20% discount
        result = calculate_discount(price, customer_type)
        self.assertEqual(result, expected)

    def test_calculate_discount_loyal_customer(self):
        price = 100
        customer_type = 'Loyal'
        expected = 90  # 10% discount
        result = calculate_discount(price, customer_type)
        self.assertEqual(result, expected)

    def test_calculate_discount_regular_customer(self):
        price = 100
        customer_type = 'Regular'
        expected = 100  # No discount
        result = calculate_discount(price, customer_type)
        self.assertEqual(result, expected)

    def test_is_eligible_for_loan_underage(self):
        age = 17
        income = 50000
        credit_score = 700
        result = is_eligible_for_loan(age, income, credit_score)
        self.assertFalse(result)

    def test_is_eligible_for_loan_low_income(self):
        age = 25
        income = 15000
        credit_score = 700
        result = is_eligible_for_loan(age, income, credit_score)
        self.assertFalse(result)

    def test_is_eligible_for_loan_low_credit_score(self):
        age = 30
        income = 50000
        credit_score = 550
        result = is_eligible_for_loan(age, income, credit_score)
        self.assertFalse(result)

    def test_is_eligible_for_loan_eligible(self):
        age = 30
        income = 50000
        credit_score = 700
        result = is_eligible_for_loan(age, income, credit_score)
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()
```

## Instructions to Run and See Output

1. **Project Structure Confirmation:**
    Ensure your project structure matches the following:

```
backend_app/
├── business_logic.py
└── tests/
    └── test_business_logic.py
```

2. **Copy the Code:**

    * Place the provided business_logic.py in backend_app/.
    * Place the generated test_business_logic.py in backend_app/tests/.

3. **Run the Unit Tests:**

    * Navigate to the backend_app directory in your terminal:

```bash
cd backend_app
111

    * Run the tests using the unittest framework:

```bash
python -m unittest tests/test_business_logic.py
```

4. **Expected Output:**

You should see output similar to:

```
.......
----------------------------------------------------------------------
Ran 7 tests in 0.001s

OK
```

**Note:** Replace backend_app, business_logic.py, and function names with your actual project names and functions when using the prompt in your real work scenarios.
