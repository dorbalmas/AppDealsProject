import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
class LoggedResturantPanel extends Component {
  state = {};
  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    return (
      <div className="row justify-content-center align-items-center fixed-top ">
        <nav className="navbar navbar-light bg-dark form-control h-25">
          <Popup
            content="Home Page!"
            trigger={
              <Link
                to="/"
                className="navbar-brand p-2 mr-4"
                style={{
                  color: "rgb(199, 196, 196)",
                  textShadow: "#474747 3px 5px 2px",
                }}
              >
                DailyDeals
              </Link>
            }
          />
          <div className="d-flex justify-content-around">
            <Link className="nav-link mx-2 " to="/user/profile">
              Profile
            </Link>
            <Link className="nav-link mx-2 " to="/user/dish">
              New Deal
            </Link>
            <Link className="nav-link mx-2 " to="/user/DealList">
              Deals List
            </Link>
          </div>
          <Link
            onClick={this.handleLogout}
            className="nav-link mx-2 text-danger"
            to="/"
          >
            Logout
          </Link>
        </nav>
      </div>
    );
  }
}

export default LoggedResturantPanel;
