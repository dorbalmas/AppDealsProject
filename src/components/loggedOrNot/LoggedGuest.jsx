import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
class LoggedGuestPanel extends Component {
  state = {};

  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    return (
      <div className="row justify-content-center align-items-center fixed-top ">
        <nav className="navbar navbar-dark bg-dark form-control h-25">
          <Popup
            content="Home Page!"
            trigger={
              <Link
                to="/"
                className=" navbar-brand p-2 mr-4"
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
            <Link
              to="/"
              className=" navbar-brand p-2 mr-4"
              style={{
                color: "rgb(199, 196, 196)",
                textShadow: "#474747 3px 5px 2px",
              }}
            >
              Home
            </Link>
            <Link className="nav-link mx-2 mr-4 " to="/user/cart">
              Cart{" "}
              <span
                style={{
                  borderRadius: "50%",
                  backgroundColor: "green",
                  color: "white",
                }}
                className="badge"
              >
                {this.props.cartSize}
              </span>
            </Link>
            <Link className="nav-link mx-2 mr-4 " to="/user/OrderTableList">
              Shopping History{" "}
            </Link>

            {/* <!--הוספתי קצת מוזיקה לנאב בר  --> */}
            <div className="col-3 d-flex justify-content-center align-items-center text-info">
              press me
              <i className="fa fa-arrow-right px-1" aria-hidden="true"></i>
              <Popup
                content="Enjoy the music!"
                trigger={
                  <div
                    style={{
                      position: "relative",
                      width: "50px",
                      height: "34px",
                      overflow: "hidden",
                    }}
                    className="rounded"
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-263px",
                        left: "-14px",
                      }}
                    >
                      <iframe
                        width="300"
                        height="300"
                        src="https://www.youtube.com/embed/5qap5aO4i9A?playlist=dTbONq0zxRA&rel=0"
                      ></iframe>
                    </div>
                  </div>
                }
              />
            </div>
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

export default LoggedGuestPanel;
