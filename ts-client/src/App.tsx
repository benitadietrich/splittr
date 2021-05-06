import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/Home" component={Home}></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
