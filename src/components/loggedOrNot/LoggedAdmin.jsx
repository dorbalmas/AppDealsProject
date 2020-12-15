import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
class LoggedAdminPannel extends Component {
  state = {};

  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    return (
      <div className="row justify-content-center align-items-center fixed-top ">
        <nav className="navbar navbar-light bg-dark form-control h-25">
          <Link
            to="/"
            className="navbar-brand p-2 mr-4"
            style={{
              color: "rgb(199, 196, 196)",
              textShadow: "#474747 3px 5px 2px",
            }}
          >
            AppDeal
          </Link>
          <div className="d-flex justify-content-around">
            <Link className="nav-link mx-2 " to="/user/resturants">
              Admin Page
            </Link>

            {/* <!--הוספתי קצת מוזיקה לנאב בר  --> */}
            <div className=" d-flex justify-content-center align-items-center text-info">
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
                        left: "-10px",
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

export default LoggedAdminPannel;
