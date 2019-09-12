# augur-front-test

This repository contains both projects used to create the test.
- **[augur-react-test](https://github.com/ajimenezdev/augur-front-test/tree/master/augur-react-test)**: contains the React web application to render all data
- **[token-project](https://github.com/ajimenezdev/augur-front-test/tree/master/token-project): contains**: the provided NodeJS server project with some modifictions

*Ideally in a real environment both projects will have been uploaded to different GitHub repositories but for the simplicity and easy of review I have used a shared GitHub repo

## token-project [](https://github.com/ajimenezdev/augur-front-test/tree/master/token-project)
The provided NodeJS server project with some modifictions.
The modifictions made to the project are:
- Finish the endpoint */:token/stats/mostActive*  
This endpoint check arguments and calls to the existing function *calculateMostActive*
- Enable CORS calls  
In order to be able to run the test locally as I'm not making calls from the same domain, I have enabled CORS within the express app
- Add new endpoint */:token/account/:account/transactionsCount*  
This new endpoint returns an object with the number of Outgoing and Incoming transactions from a particular account.
*This task was not required but I wanted to do some extra call due to the "calculateMostActive* almost done, and on the Frontend the stats area for an account was looking too empty

## augur-react-test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Architechture
It is a single page application, thus it does not have any route management library.
Folder structure is organised in two main folders
- **components**: The individual components use to create the different views
- **data**: Used to have the file containing all the *useReducer* logic and Api calls

### Styles
- For the styles I have used [Material-ui library ](https://material-ui.com) to provide a quick way to style different components more visually
- All the design has been done thinking both on Mobile and Desktop views, so it should be responsive
- All the styles are kept together to the component that they are affecting, to make it easier to locate and maintain in the future
- For this project I have not integrated any CSS library like SASS, JSS, StyledComponents, as it was something simple

### Testing
There are a bunch of simple Snapshop tests and some interaction tests, to make sure all the components renders without errors, the main information passed as props is displayed on the right place and the callbacks are executed.

For the test part I have made use of
- **Jest**: already included with CRA
- **[testing-library](https://testing-library.com/)**: To test the components, interact with elements, read information, etc.
- **react-test-renderer**: To create Snapshoot Tests

### StateManagement
To keep it simple and align with the scope and size of this tests I have decided to not include any StateManagement library like Redux, Mobx, Flux, etc.
Instead of that I have been making use of the new React Hook *useReducer* which provides a functionality similar to a ReduxReducer but without all the configuration of Redux, very useful for small projects.

Apart from *useReducer* I have been using *useState* hook for any data not relevant for a state management and more tied up with the UI, like a dialog open/closed.
