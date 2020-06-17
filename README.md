# Team_Titans_BackEnd_Js

To Contribute...

1. Create a personal fork of this repo on your Github.

2. Clone the fork on your local machine (pc) .
	using "git clone url of the repo."
 Once you have cloned your remote on Github is called origin.

3. On your local machine (pc) inside the cloned 	  project, add the origin repository as a remote called upstream.
i.e git remote add upstream url of the repo.

4. Create a new branch to work on. Branch from the master branch. It is recommended that you make a new branch for every new feature you work on and work from there.
You can use "git checkout -b name of new brach" shorthand to create a new brach and switch to it .

5. Push your branch to your fork Github, i.e the remote origin.

6. From your fork open a pull request in the correct branch. Target the project's master branch.

7. Be sure to always pull upstream changes into your local repository to keep updates of the main repo.

"git pull upstream branch_name" which is the main branch (master).
  

  These are the set of instructions from Mark.

  Try and always:
8. Comment your codes properly.

9. Follow the code style of the project including indentation.

GOOD LUCK... 


## Getting started After Cloninig


This is a basic API skeleton written in JavaScript ES2015. Very useful to building a RESTful web APIs for your front-end platforms like Android, iOS or JavaScript frameworks (Angular, Reactjs, etc).

This project will run on **NodeJs** using **MongoDB** as database. I had tried to maintain the code structure easy as any beginner can also adopt the flow and start building an API. Project is open for suggestions, Bug reports and pull requests. 

## Features

-   Basic Authentication (Register/Login with hashed password)
-   Account confirmation with 4 (Changeable) digit OTP.
-   Email helper ready just import and use.
-   JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
-   Pre-defined response structures with proper status codes.
-   Included CORS.
-    **Book** example with **CRUD** operations.
-   Validations added.
-   Included API collection for Postman.
-   Light-weight project.
-   Test cases with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
-   Code coverage with [Istanbuljs (nyc)](https://istanbul.js.org/).
-   Included CI (Continuous Integration) with [Travis CI](https://travis-ci.org).
-   Linting with [Eslint](https://eslint.org/).

## Software Requirements

-   Node.js **8+**
-   MongoDB **3.6+** (Recommended **4+**)

## Getting started with the Server

### Install npm dependencies after installing (Git or manual download)

```bash
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.
## Project  structure
```sh
.
├── app.js
├── package.json
├── bin
│   └── www
├── controllers
│   ├── AuthController.js
│   └── SmsController.js
├── models
│   ├── SmsModel.js
│   └── UserModel.js
├── routes
│   ├── api.js
│   ├── auth.js
│   └── sms.js
├── middlewares
│   ├── jwt.js
├── helpers
│   ├── apiResponse.js
│   ├── constants.js
│   ├── mailer.js
│   └── utility.js
├── test
│   ├── testConfig.js
│   ├── auth.js
│  
└── public
    ├── index.html
    └── stylesheets
        └── style.css
```
## How to run

### Running  API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```
**Note:**  `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/routes/` and add it in `/routes/api.js` it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.

## Tests

### Running  Test Cases

```bash
npm test
```

You can set custom command for test at `package.json` file inside `scripts` property. You can also change timeout for each assertion with `--timeout` parameter of mocha command.

### Creating new tests

If you need to add more test cases to the project just create a new file in `/test/` and run the command.

## ESLint

### Running  Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.



