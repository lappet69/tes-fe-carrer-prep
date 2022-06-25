import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
const Routes = () => {
  return (
    <Router>
      <Route path="/dashboard" element={"dashboard"} />
      <Route path="/" element={<Login />} />
    </Router>
  );
};

export default Routes;
