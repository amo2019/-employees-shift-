import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
//import * as actions from "./actions";
import firebase from "firebase";
// import firebase from "firebase/app";
import Header from "./components/common/Header";
import { loginUser } from "./actions";
//import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import LoginForm from "./components/LoginForm";
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeCreate from "./components/EmployeeCreate";
//import Employees from "./pages/Employees";
import Landing from "./components/Landing";
import { config } from "./components/utils/firebaseUtils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({
      loggedin: false,
      user: {},
    });
    console.log(this.state.loggedin);
  }

  handleLogin(data) {
    this.setState({
      loggedin: true,
      user: data,
    });
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route
              render={(props) => (
                <Header
                  {...props}
                  loggedin={this.state.loggedin}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Switch>
              <Route exact path={"/"} render={(props) => <Landing />} />
              <Route
                exact
                path={"/employeelist"}
                render={(props) => (
                  <EmployeeList
                    {...props}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    loggedin={this.state.loggedin}
                  />
                )}
              />

              <Route
                exact
                path={"/loginform"}
                render={(props) => (
                  <LoginForm
                    {...props}
                    loggedin={this.state.loggedin}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                  />
                )}
              />
              <Route
                exact
                path={"/employeecreate"}
                render={(props) => (
                  <EmployeeCreate
                    {...props}
                    loggedin={this.state.loggedin}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                  />
                )}
              />
              <Route
                exact
                path={"/employeeedit"}
                render={(props) => (
                  <EmployeeEdit
                    {...props}
                    loggedin={this.state.loggedin}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedin } = auth;
  return { email, password, error, loading, loggedin };
};

export default connect(mapStateToProps, { loginUser })(App);
