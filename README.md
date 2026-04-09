# Setting up Development Environment

This guide provides step-by-step instructions on how to set up your development environment for working with the project. It covers the installation of the following tools:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your machine:

- Windows, macOS, or Linux operating system
- Internet connection

## Installation

Follow the steps below to install the required tools:

### 1. Visual Studio Code

Visual Studio Code is a lightweight and powerful code editor that provides excellent support for various programming languages. To install Visual Studio Code, follow these steps:

1. Visit the Visual Studio Code website.
2. Download the installer for your operating system.
3. Run the installer and follow the on-screen instructions.
4. Open Visual Studio Code once the installation is complete.

### 2. Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code outside of a web browser. To install Node.js, follow these steps:

1. Visit the Node.js website.
2. Download the LTS (Long Term Support) version, which is recommended for most users.
3. Run the installer and follow the on-screen instructions.
4. Open a new terminal or command prompt window.
5. Verify the installation by running the following command:

    ```
    node --version
    ```
    
    It should display the installed Node.js version.

### 3. npm

npm is the package manager for Node.js. It allows you to install and manage dependencies for your projects. To install the latest version of npm, follow these steps:

1. Open a terminal or command prompt window.
2. Run the following command:

    ```
    npm install -g npm@latest
    ```
    
    This command installs the latest version of npm globally on your system.

## Verification

To verify that the installation was successful, run the following commands in a terminal or command prompt window:

- Visual Studio Code:

   ```
   code --version
   ```
  
  It should display the installed version of Visual Studio Code.

- Node.js:

  ```
  node --version
  ```
  
  It should display the installed version of Node.js.

- npm:

    ```
    npm --version
    ```
  
  It should display the installed version of npm.

If all the versions are displayed correctly, you have successfully set up your development environment.

## Setting Up the Database

To set up the database for the project, follow the steps below:

1. Ensure that you have SQL Server Management Studio (SSMS) installed on your machine.

2. Open SSMS and connect to your SQL Server instance.

3. Locate the two SQL script files: TJSDB.sql and CreateTJSDBUserAndGivePermissions.sql. These files are available in the MSSQLDatabaseFiles folder.

4. Open the TJSDB.sql file in SSMS. This script will create the TJSDB database.

5. Click on the Execute button (or press F5) to run the script. This will create the database.

6. After the database is created, open the CreateTJSDBUserAndGivePermissions.sql file in SSMS. This script will create a user for the TJSDB database and assign necessary permissions.

7. Click on the Execute button (or press F5) to run the script. This will create the user and assign permissions.

8. Verify that the database and user have been created successfully.

Once you have completed these steps, the database setup for the project is complete and you can proceed with the next steps.

## Getting Started - TJS API Server

To run the TJS Node.js API server locally, follow these steps:
1. Navigate to the `APIServer` directory and open the .env file using text editor and set the required environment variables:
```
DB_SERVER=<Your MS-SQL Server name>
DB_USER=TJSAdministrator
DB_PASSWORD=adminTJS$18052023
DB_DATABASE=TJSDB
JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IlRKU0FkbWluaXN0cmF0b3IiLCJleHAiOjMyNjIzNTg1NTIsImlhdCI6MTY4NDQzNTM1Mn0.4_BqgUkMgqkGvNNTLpp95kW03YqJv2fpXAkYTzXpaPk
```

2. Open a terminal or command prompt.
3. Navigate to the `APIServer` directory of where the package.json file is located.
4. Run the following command:
```
npm install express mssql bcrypt jsonwebtoken dotenv sequelize cors --save
```
5. Navigate to the `APIServer/src` directory of where the server.js file is located.
6. Run the following command:
```
node server.js
```
7. This command will execute the server.js file using Node.js.
If everything is set up correctly, you should see a message in the terminal indicating that the server is listening on a specific port. For example:
```
TJS API Server listening on port 3000
```
This means your server is running and ready to handle incoming requests.

## Conclusion

Congratulations! You have completed the setup of your development environment by installing Visual Studio Code, Node.js, and the latest version of npm. You are now ready to start working on the project.

For more information and project-specific instructions, please refer to the project's documentation or README file.

## License

This project is licensed under the MIT License.
