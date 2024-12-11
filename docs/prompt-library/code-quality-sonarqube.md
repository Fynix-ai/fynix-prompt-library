---
id: code-quality-sonarqube
title: Resolving Code Quality Issues from SonarQube
sidebar_label: SonarQube Quality Issues
---

## Prompt Template:
"Please help me resolve the following issues reported by SonarQube:

1. **[Issue Type, e.g., Bug/Security Vulnerability/Code Smell]:** **[Issue Summary, e.g., Functions should not have too many lines]**

    * Location: **[File Name]** line **[Line Number]**
    * Issue Details: **[Detailed Description of the Issue]**

2. **[Issue Type]**: **[Issue Summary]**

    * Location: **[File Name]** line [**Line Number]**
    * Issue Details: **[Detailed Description of the Issue]**

3. **[... Additional Issues]**

For each issue, please suggest how to fix it, including code changes where necessary.“


## Sample SonarQube Issues
Project: WebAppSecurity
Language: JavaScript (Node.js)
SonarQube Report Highlights:

1. **Code Smell:** Functions should not have too many lines (maximum allowed is 20).

    * Location: app.js line 50
    * Issue: The function processUserData() has 35 lines.

2. **Security Vulnerability:** Use of eval is a security risk.

    * Location: utils.js line 15
    * Issue: The code uses eval(userInput).

3. **Bug:** Possible memory leak due to unclosed database connections.

    * Location: database.js line 25
    * Issue: The database connection is not properly closed.

4. **Code Smell:** Duplicate code blocks detected.

    * Locations: userController.js lines 30-45 and adminController.js lines 22-37
    * Issue: Similar code blocks should be refactored into a common function.


## Project Files

**Project Structure:**

```
WebAppSecurity/
├── app.js
├── utils.js
├── database.js
├── controllers/
│   ├── userController.js
│   └── adminController.js
└── package.json
```


##Workflow to Resolve SonarQube Issues Using Fynix

**Step 1: Review SonarQube Report**

* Access the SonarQube dashboard and identify the reported issues.
* Note the locations and descriptions of each issue.

**Step 2: Open the Project in the IDE**

* Open WebAppSecurity in your IDE (e.g., VS Code, IntelliJ) with the Fynix plugin installed and activated.

**Step 3: Address Each Issue Using Fynix**

Use mentions to tag the relevant file.

### Prompt to Fynix:

Resolve following Issues reported by SonarQube in the relevant location:


1. **Code Smell:** Functions should not have too many lines (maximum allowed is 20).

Location: @app.js line 50
Issue: The function processUserData() has 35 lines.

2. **Security Vulnerability:** Use of eval is a security risk.

Location: @utils.js line 15
Issue: The code uses eval(userInput).

3. **Bug:** Possible memory leak due to unclosed database connections.

Location: @database.js line 25
Issue: The database connection is not properly closed.

4. **Code Smell:** Duplicate code blocks detected.

**Locations:** @userController.js lines 30-45 and @adminController.js lines 22-37
**Issue:** Similar code blocks should be refactored into a common function.

**Step 4:** Apply changes to files by using “insert at selection” after selecting the code to be replaced or “insert in a new file” and save this file with right name and delete the previous file

