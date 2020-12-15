import React, { Component } from "react";
import "./user.css";
import { Link } from "react-router-dom";
import { userLogin } from "../../services/UserServ";
import Swal from "sweetalert2";

class Login extends Component {
  state = {};

  emailRef = React.createRef();
  passwordRef = React.createRef();

  componentDidMount() {
    if (localStorage["token"]) {
      if (this.props.history) {
        this.props.history.push("/");
      } else {
        window.location.href = "/";
      }
    }
  }
  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };
  handleSubmit = async () => {
    const user = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    };
    userLogin(user).then(async (data) => {
      if (data.logged) {
        await Swal.fire({
          title: 'Welcome Back! <i class="far fa-smile-wink"></i>',
          showConfirmButton: false,
          timer: 1500,
        });
        this.props.login(data.body, data.token);
        if (this.props.history) {
          this.props.history.push("/");
        } else {
          window.location.href = "/";
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.body,
          footer: "<a href>Why do I have this issue?</a>",
        });
      }
    });
  };

  render() {
    return (
      <div className="auth-wrapper pt-2">
        <div
          onKeyPress={this.keyPressed}
          className="auth-inner"
          style={{ background: "lightgrey", opacity: 0.8 }}
        >
          <h3>
            <b>Login</b>
          </h3>
          <div className="form-group">
            <label>Email address:</label>
            <input
              ref={this.emailRef}
              className="form-control"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              ref={this.passwordRef}
              className="form-control"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <button
            onClick={this.handleSubmit}
            className="btn btn-primary btn-block my-3"
          >
            Login
          </button>
          <Link to="/user/signup">New Member?</Link>
        </div>
      </div>
    );
  }
}

export default Login;
