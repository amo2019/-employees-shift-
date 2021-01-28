import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";

//Development purpose only
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// console.log('STRIPE KEY IS: ', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is: ', process.env.NODE_ENV);

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";
// import { Provider } from "react-redux";
// import reducers from "./reducers";
// import { createStore, applyMiddleware } from "redux";
// import ReduxThunk from "redux-thunk";

// import { BrowserRouter as Router } from "react-router-dom";
// import createBrowserHistory from "history/createBrowserHistory";

// export const history = createBrowserHistory();

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
// ReactDOM.render(
//   <Router history={history}>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </Router>,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
