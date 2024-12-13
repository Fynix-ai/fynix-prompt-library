---
id: mentions
title: Mentions
sidebar_label: Mentions
---
1. **Dependency Management Across Multiple Files**

**Description:** Generate a comprehensive list of dependencies by analyzing specified project files. This is useful for creating or updating dependency files like requirements.txt for Python or package.json for Node.js.

**Prompt Template**

Generate a list of dependencies based on the following files: 
@file1.filetype, @file2.filetype, etc.



**Example Prompt**

Generate a list of dependencies based on the following files: 
@app.py, @utils.py, @models.py.



2. **Contextual Debugging of Specific Files**

**Description:** Analyze the interactions and relationships between specific files to identify potential issues in function calls or data flow, aiding in debugging.

**Prompt Template**

Analyze the relationship between these files and identify any potential issues
 in function calls or data flow: @file1.filetype, @file2.filetype.



**Example Prompt**

Analyze the relationship between these files and identify any potential issues
 in function calls or data flow: @main.js, @utils.js.



3. **Cross-File Code Refactoring**

**Description:** Identify duplicate or redundant code across multiple files and refactor it into a new, reusable module to enhance maintainability and reduce technical debt.

**Prompt Template**

Identify duplicate code across these files and refactor it into
 a new module named @newModule.filetype: @file1.filetype, @file2.filetype.



**Example Prompt**

Identify duplicate code across these files and refactor it into
 a new module named commonUtils.js: @service1.js, @service2.js.



4. **Interacting with Specific Functions**

**Description:** Mention and interact with specific functions within your codebase to get explanations, generate docstrings, or optimize their implementations.

**Prompt Template**

Explain the functionality of the function @functionName in @file.filetype.



**Example Prompt**

Explain the functionality of the function calculateTotal in @orderService.js.



5. **Interacting with Folders**

**Description:** Mention and interact with specific folders within your workspace to manage, analyze, or get summaries of their contents.

**Prompt Template**

Provide an overview of the contents and structure of the folder @folderName.



**Example Prompt**

Provide an overview of the contents and structure of the folder @src.



6. **Get Suggestions on Git Diff**

**Description:** Get explanations and suggestions on specific Git diffs or commits to understand changes, identify potential issues, or improve code quality.

**Prompt Template**

@Git explain the differences in commit **[commit ID]**.



**Example Prompt**

@Git explain the differences in commit abc1234.



7. **Workspace Analysis with Mentions**

**Description:** Perform a comprehensive analysis of the entire workspace or specific parts by mentioning particular files, folders, or components, to gain insights into code structure, dependencies, and patterns.

**Prompt Template**

@Workspace analyze the codebase and provide an overview of its structure,
 key components, and dependencies.



**Example Prompt**

@Workspace analyze the codebase and provide an overview of its structure,
 key components, and dependencies.



8. **Get Answers from Web**

**Description:** Utilize the AI assistant's ability to browse the web to fetch relevant information, answer queries, or gather data to support development tasks.

**Prompt Template**

@web [Your query here].



**Example Prompt**

@web list down features from the latest Python release.



9. I**nteractive Document Engagement with **

**Description:** Engage interactively with documents by mentioning them, allowing the AI assistant to facilitate discussions, summarize content, or answer questions based on the document's information.

**Prompt Template**

@docs **[Document Name]** generate a summary of its content.



**Example Prompt**

@docs ProjectOverview.pdf generate a summary of its content.



10. **Jira Tickets Interaction**

Description: Interact with Jira tickets directly within the AI coding assistant by mentioning them, enabling retrieval of ticket details, status updates, or assistance in resolving issues.

**Prompt Template**

@jira **[ticket ID]** **[ question]**.



**Example Prompt**

```@jira PROJ-1234 summarize the ticket```

