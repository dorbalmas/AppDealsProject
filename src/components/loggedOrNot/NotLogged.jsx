import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotLoggedPanel extends Component {
  state = {};
  render() {
    return (
      <div className="row justify-content-center align-items-center fixed-top">
        <nav className="navbar navbar-light bg-dark form-control h-25 ">
          <Link className="nav-link mx-2 text-danger" to="/user/signup">
            Sign Up
          </Link>
          <Link className="nav-link mx-2 text-success" to="/user/login">
            Log in
          </Link>
        </nav>
      </div>
    );
  }
}

export default NotLoggedPanel;
