---
id: jenkins-cicd
title: Setting Up and Configuring Jenkins Pipelines for CI/CD
sidebar_label: Jenkins Pipelines
---

## Prompt Template
"Fynix, I need to set up a Jenkins pipeline for my **[language/framework]** application to automate the build, test, and deployment process. The application is hosted on **[repository URL]**. I want the pipeline to:

1. **[Step 1]**
2. **[Step 2]**
3. **[Step 3] ...**

Can you provide a step-by-step guide, including the Jenkinsfile code, to set up and configure the Jenkins pipeline? Please include all necessary commands and configurations so I can copy and paste them to run and see the output immediately.“

## Scenario

You have a simple Java application hosted in a GitHub repository, and you want to set up a Jenkins pipeline to automate the following steps:

1. Clone the repository from GitHub.
2. Build the application using Maven.
3. Run unit tests to ensure the code is functioning correctly.
4. Package the application into a JAR file.
5. Deploy the application to a local directory or server.

You need to:

* Install Jenkins and configure it to work with your GitHub repository.
* Create a Jenkinsfile that defines the pipeline steps.
* Set up a Jenkins job to execute the pipeline whenever changes are pushed to the repository.


## Prompt to Use in Fynix

"Fynix, I need to set up a Jenkins pipeline for my Java application to automate the build, test, and deployment process. The application is hosted on GitHub at `https://github.com/yourusername/your-java-app`. I want to:

1. Clone the repository from GitHub.
2. Build the application using Maven.
3. Run unit tests.
4. Package the application into a JAR file.
5. Deploy the application to a local directory /opt/apps/.

Can you provide a step-by-step guide, including the Jenkinsfile code, to set up and configure the Jenkins pipeline? Please include all necessary commands and configurations so I can copy and paste them to run and see the output immediately.“


## Expected Output from Fynix

**Step-by-Step Guide to Setting Up Jenkins Pipeline**

Prerequisites

* Java JDK installed on the Jenkins server.
* Maven installed on the Jenkins server.
* Git installed on the Jenkins server.
* Jenkins installed and running.
* GitHub Repository with your Java application.

1. **Install Jenkins (if not already installed)**

For simplicity, we'll assume Jenkins is already installed. If not, you can install Jenkins on your local machine or server by following the official documentation: Installing Jenkins.

2. **Install Required Jenkins Plugins**

* Git Plugin: Allows Jenkins to clone Git repositories.
* Pipeline Plugin: Enables pipeline jobs.

**Install Plugins:**

    1. Open Jenkins in your browser: http://localhost:8080.
    2. Go to Manage Jenkins > Manage Plugins.
    3. Under the Available tab, search for:

        * Git Plugin
        * Pipeline

    4. Install the plugins and restart Jenkins if prompted.

3. **Create a New Pipeline Job in Jenkins**

    1. From the Jenkins dashboard, click New Item.
    2. Enter Job Name: JavaAppPipeline.
    3. Select Pipeline and click OK.

4. **Configure the Pipeline Job**

In the Pipeline section, select Pipeline script from SCM:

* SCM: Git
* Repository URL: `https://github.com/yourusername/your-java-app.git`
* Credentials: If your repository is private, add your GitHub credentials.
* Branches to build: `*/main `(or the appropriate branch)
* Script Path: Jenkinsfile

5. **Add a Jenkinsfile to Your Repository**

Create a file named Jenkinsfile in the root of your GitHub repository with the following content:

```
// Jenkinsfile

pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/yourusername/your-java-app.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }

        stage('Package') {
            steps {
                sh 'mvn package'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'cp target/your-java-app.jar /opt/apps/'
            }
        }
    }
}
```

**Note:** Replace your-java-app.jar with the actual name of your JAR file.


6. **Commit and Push the Jenkinsfile**

Add, commit, and push the Jenkinsfile to your GitHub repository:

```git add Jenkinsfile
git commit -m "Add Jenkinsfile for CI/CD pipeline"
git push origin main
```

7. **Set Up Build Triggers (Optional)**
If you want Jenkins to automatically trigger the pipeline when changes are pushed to GitHub:

    1. In your Jenkins job configuration, scroll to the Build Triggers section.
    2. Check GitHub hook trigger for GITScm polling.

**Set Up Webhook in GitHub:**

    1. In your GitHub repository, go to Settings > Webhooks.
    2. Click Add webhook.
    3. Payload URL: http://your-jenkins-server:8080/github-webhook/
    4. Content type: application/json
    5. Secret: (Optional)
    6. Which events would you like to trigger this webhook?: Just the push event.
    7. Click Add webhook.

8. **Run the Pipeline**

    1. In Jenkins, open your JavaAppPipeline job.
    2. Click Build Now.
    3. Monitor the build progress in the Console Output.

9. **Verify the Deployment**

* The application JAR file should be copied to /opt/apps/ on the Jenkins server.
* Verify that the file exists:
```bash
ls /opt/apps/
```
* You should see your-java-app.jar.

10. **Handling Permissions (If Necessary)**

If you encounter permission issues when copying files to `/opt/apps/`, you may need to:

* Change the directory permissions:

sudo chmod -R 777 `/opt/apps/`

* Or, adjust the Jenkins user permissions.






Note: Replace https://github.com/yourusername/your-java-app and other placeholders with your actual repository URL and application specifics when applying these instructions.
