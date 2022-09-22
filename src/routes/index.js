import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Discover from "./Discover";
import Login from "./Login";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Discover />} />
      </Switch>
    </Router>
  );
}
