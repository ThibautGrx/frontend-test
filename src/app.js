import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CarList from './car-list'
import NavbarCustom from "./navbar";

function App() {
  return (
    <Router>
      <div>
      <NavbarCustom />
        <Route path="/cars" exact component={CarList} />
      </div>
    </Router>
  );
}

export default App;