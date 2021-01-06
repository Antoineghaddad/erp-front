import React, { useEffect, useState } from "react";
import "./App.css"; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import Login from "./Components/Login";
import Admins from "./Components/Admins";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Teams from './Components/Teams';
import Projects from './Components/Projects';
import Reports from './Components/Reports';
import Employees from './Components/Employees';



const App = () => {

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
  
    console.log(token);
    if(token) {
      setRedirect('/Admins');
    }
    else {
      setRedirect('/');
    }
  }, [])

  

  const redirectFunc = () => redirect && <Redirect to={redirect} />

  const store = createStore(() => [], {}, applyMiddleware());
  return (
    <Provider store={store}>
      <Router>
        {redirectFunc()}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Admins" component={Admins} />
            <Route exact path="/Employees" component={Employees} />
            <Route exact path="/Teams" component={Teams} />
            <Route exact path="/Projects" component={Projects} />
            <Route exact path="/Reports" component={Reports} />
          </Switch>
      </Router>
    </Provider>
  );
};

export default App;