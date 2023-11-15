# React project (Project Portfolio 5, Advanced FrontEnd) for Code Institute.

## General information
This Readme goes through the steps of setting up your workspace and deploying your project to both GitHub and Heroku.


Link to the application: [Click Here!](https://pro5-aeecc7322fbc.herokuapp.com/)

Link to the Backend README: [Click Here!](https://github.com/gStarhigh/pro5/blob/main/Backend_README.md)

Link to the Frontend README: [Click Here!](https://github.com/gStarhigh/pro5/blob/main/README.md)

![Fullscreen image of the application:](/documentation/images/amiresponsive.PNG)

## Table of Contents

 - ## [General Information](#general-information)

 - ## [Table of Contents](#table-of-contents-1)


- ## [Deployment](#Deployment)
    - ## [Creating the Workspace](#creating-the-workspace-1)
    - ## [Creating the Heroku app](#creating-the-heroku-app-1)

- ## [GitHub Pages](#github-pages-1)


## Deployment

### Creating the workspace
I have created both my FrontEnd and the BackEnd in the same workspace. All instructions that follow are for a combined workspace using GITPOD. If you have your Backend in a separate workspace or use CodeAnywhere, this is not the correct way to continue and some thing might differ.


1. Navigate to [This link](https://github.com/Code-Institute-Org/gitpod-full-template) , and click "Use this template".
2. Click Create a new repository.
3. Choose a name for your repository and click "Create repository"
4. Then you can open it up in GitPod by clicking the Green "Gitpod" button.

#### Create the Backend
1. When your IDE has finished installing everything, type "pip3 install 'django<4'" to install the same version of django as I used. If you want the latest, just type "pip install django"
2. Create your project by typing in the termial: "django-admin startproject *yourprojectsname* ."
Don't forget the dot at the end.
3. Install Cloudinary by typing in the termial: "pip install django-cloudinary-storage".
4. Install Pillow by typing in the terminal: "pip install Pillow". Notice the capital P.
5. Add cloudinary to the Installed Apps. Notice the order of where they are inserted:
    <details>
    <summary>Installed apps</summary>
    <img src="documentation/deployment/images/cloudinary_apps.png">
    </details>
6. Navigate to [Cloudinary](https://cloudinary.com/) and create an account.
7. In the account details section, there is an API Envrionment variable. Copy that URL.
8. Create a filed called "env.py" in the root of your directory.
9. At the top of the env.py file write: "import os"
10. Add this line to your env.py file: os.environ['CLOUDINARY_URL'] = "Paste the URL here".
    Make sure the url starts with "cloudinary://" and not "CLOUDINARY_URL=cloudinary://".
11. Go to the settings.py file and find the SECRET_KEY, and copy it.
12. Go back to the env.py file and add this line: os.environ['SECRET_KEY'] = 'PAST IN YOUR SECRET KEY HERE'
13. Go back to your settings.py file and add these lines at the top of the file:
    <details>
    <summary>Settings Imports</summary>
    <img src="documentation/deployment/images/settings_imports.png">
    </details>
14. Add these lines to the settings file:
    <details>
    <summary>Cloudinary</summary>
    <img src="documentation/deployment/images/cloudinary_url.png">
    </details>

    <details>
    <summary>Secret Key</summary>
    <img src="documentation/deployment/images/secret_key.png">
    </details>

    <details>
    <summary>Media</summary>
    <img src="documentation/deployment/images/media.png">
    </details>
15. Now the basic settings are in place, and since we have moved the SECRET_KEY to the env.py file before comitting and pushing to GitHub, it is safe and we can now add, commit, and push our first time to GitHub.
    - NOTE: It's important that you have not comitted anything while the Secret Key was in settings.py as this will then be open for everyone to find in your GitHub account. If you have done this, change the secret key variable in your env.py file, and commit and push again. Now the secret key is protected.

#### Creating the FrontEnd inside the Backend workspace

. Open the workspace for your Backend project.

2. Open the terminal window and create a new folder called frontend in the root directory with this command:
    - "mkdir frontend"

3. Change directory to be inside the frontend folder with the following command:
    - "cd frontend"

4. From inside the frontend directory, run the following command to create a new React app and install all the working dependencies:
    - "npx create-react-app . --template git+https://github.com/Code-Institute-Org/cra-template-moments.git --use-npm"

5. Enter "y" to confirm.

6. When everything has completed, Enter the following command to remove the .git folder, .gitignore file and README.md from the frontend folder as these already exist within the root directory of your Backend project.
    - NOTE: Make sure you are in the frontend terminal when running this command:
    - "rm -rf .git .gitignore README.md"

7. Inside the FrontEnd directory, run the following command to make sure it works:
    - "npm start"

8. Open the browser to see the React logo so it works as expected.

9. Stop the application with "CTRL-C" in the terminal on windows, and "CMD-C" on a Mac.
10. Move back to the root of your directory by "cd ..".(My personal way is to have one terminal open for the backend and one for the frontend side by side. Simplifies the process.)

11. Add, commit, and push your changes to GitHub every so often.

12. 







#### Creating the Heroku app and Elephant SQL database.

1. Install Gunicorn:
    - pip3 install 'django<4' gunicorn
2. Install Supporting libraries:
    - pip3 install dj_database_url==0.5.0 psycopg2
3. Create requirements.txt file:
    - pip3 freeze --local > requirements.txt

4. Log in, or create an account at [ElephantSQL](https://elephantsql.com/).
5. Click "Create new instance".
6. Choose a name for your project.
7. Choose your plan (Choose Tiny Turtle for the free option).
8. Tags are optional to fill out, then press "Select region".
9. Choose the region closest to you.
10. Return to the dashboard and choose your newly created project.
11. Under "Details", find the URL for your database and copy it. The link starts with "postgres://...." (We will use this soon)

Back to creating the Heroku APP.

12.  Login to Heroku and click "New" -> "Create new app" to start a new project.
13. Login to Heroku and click "New" -> "Create new app" to start a new project.
14.  Choose an "app name" and "Region" - Then press "Create app".
15. Remove any installed ADD-ONS created by Heroku as we will not need them and they cost money. Your overview should look like this:
    <details>
    <summary>Overview</summary>
    <img src="documentation/deployment/images/overview.png">
    </details>


Adding Config Vars

16. Click on Settings tab, and choose "Reveal Config Vars" and add the following:
17. As key type: DATABASE_URL
    - As Value: "The link you copied earlier from ElephantSQL".
19. As key type: SECRET_KEY
    - As Value: The SECRET_KEY link in your env.py file.
20. As key type: CLOUDINARY_URL
    - As Value: Your cloudinary link in your env.py file.
21. As Key type: DISABLE_COLLECTSTATIC
    - As Value: 1

When we are finished and everything is complete, your Config Vars should look like this: 
    <details>
    <summary>Config Vars</summary>
    <img src="documentation/deployment/images/config_vars.png">
    </details>




---
## Github Pages
- This project was developed using Gitpod which I used to commit and push to GitHub using the terminal in GitPod.(Note that this project was deployed to Heroku and that those steps also must be followed.)
### Here are the steps to deploy a website to GitHub Pages from its GitHub repository:

- Log in to GitHub and locate the GitHub Repository.
- At the top of the Repository, locate the Settings button on the menu.
- Under Source, click the dropdown called None and select Main Branch.
- The page will refresh automatically and generate a link to your website.
### Forking the GitHub Repository
- By forking the GitHub Repository we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original repository by using the following steps...

- Log in to GitHub and locate the GitHub Repository.
- At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
- You should now have a copy of the original repository in your GitHub account.
### Making a Local Clone
- Log in to GitHub and locate the GitHub Repository
- Under the repository name, click "Clone or download".
- To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
- Open Git Bash
- Change the current working directory to the location where you want the cloned directory to be made.
- Type git clone, and then paste the URL you copied in Step 3. $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
- Press Enter. Your local clone will be created.