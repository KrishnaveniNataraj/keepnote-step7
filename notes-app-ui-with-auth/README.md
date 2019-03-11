# notes-app

# App URL - https://notes-app-ravi.herokuapp.com/

## Component breakdown and Hierarchy
```bash
View - 1
|__ NotesApp
|  |__Header
|  |  |__SearchBar
|  |__NotesContainer
|  |__NoteTaker
|  |__GridView
|  |  |__Note
|  |  |__Note ...
|  |__ListView
|  |  |__Note
|  |  |__Note ...
View - 2
|__EditNote
```
## Assignment PART-2

Create a view for WelcomePage component. Implement authorization and route protection and deploy your app on Heroku.

## Steps to Setup the project
1. Fork this repository into your personal workspace.
2. Clone the forked repository.
3. run `npm install`
4. run `npm run start-json-server` (NOTE: json-server is running on PORT 8080 and NOT 3000)
5. run `npm run start`
6. open browser and type (`localhost:3000`)

## Steps to Authenticate with Google using Firebase
1. Log into Firebase (https://firebase.google.com) and create an apllication.
2. Go to the application dashboard, select **Authentication**, click on SignIn method and enable **Google** SignIn.
3. Then install firbase locally in your system. Type `npm install firebase`, `npm install history`
4. Create a firebase/firbase.js file in src/ location and Initialize firebase over there with a config object.
5. Also, register your firebase app to use GoogleAuthProvider in this file.
6. Register a callback in **index.js** file which gets fired when AuthStateChanges.
6. Add handlers for Login/Logout buttons.

## Steps to Deploy on Heroku 
 ** Make sure you have a server/index.js file with serves up your build directory.
1. Create an account on Heroku.
2. Install `npm install heroku-cli`, `npm install express` for your operating system.
3. Execute **heroku login** and make sure you are able to login.
3. Execute **heroku create `name of your app`** command. (This adds a new remote heroku to your git repository)
4. create an npm script **heroku-postbuild** which runs `npm run build` - package.json file.
5. create an npm script **start** which starts up your `server/index.js`.
6. add, commit and push your code to git.
7. Push your code to Heroku by typing the command (`git push heroku master`)

## Steps to add test cases to project
1. Install required node modules with `npm install enzyme enzyme-adapter-react-16 enzyme-to-json` for your operating system.
2. Create a folder test inside src. Inside test create components folder.
3. Create setupTests.js under /src/ folder to configure the enzyme Adapter
4. Create test files for each component we wanted to test. Naming convention ComponentName.test.js **EX --** WelcomePage.test.js for welcome page test
5. Execute `npm run test` command. (This scans all files under src/test/components/ folder with *.test.js and executes one by one)
6. add, commit and push your code to git.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
