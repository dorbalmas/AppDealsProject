import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userSignup } from "../../services/UserServ";
import Swal from "sweetalert2";

class Signup extends Component {
  state = {
    valid: true,
  };
  imgs = [
    "https://cdn.pixabay.com/photo/2016/10/10/01/58/donut-1727498_960_720.png",
    "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/11/19/10/38/food-1050813_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
  ];

  componentDidMount() {
    if (localStorage["token"]) {
      if (this.props.history) {
        this.props.history.push("/");
      } else {
        window.location.href = "/";
      }
    }
  }

  typeUserRef = React.createRef();
  emailRef = React.createRef();
  passwordRef = React.createRef();
  repeat_passwordRef = React.createRef();
  answerRef = React.createRef();
  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };
  handleSubmit = async () => {
    this.setState({ valid: true });
    if (
      this.passwordRef.current.value !== this.repeat_passwordRef.current.value
    ) {
      this.setState({ valid: false }, () => {
        this.repeat_passwordRef.current.value = "";
      });
    } else {
      let newUser = {
        typeUser: this.typeUserRef.current.value,
        email: this.emailRef.current.value,
        password: this.passwordRef.current.value,
        repeat_password: this.repeat_passwordRef.current.value,
        answer: this.answerRef.current.value,
      };
      await userSignup(newUser).then(async (data) => {
        if (data.logged) {
          await Swal.fire({
            title: "Welcome to the greatest App In The Worldd!",
            text: "Modal with a custom image.",
            imageUrl: this.imgs[Math.floor(Math.random() * this.imgs.length)],
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "Custom image",
            showConfirmButton: false,
            timer: "3000",
          });
          this.setState({ logged: true });
          this.props.signup(data.body, data.token);

          if (this.props.history) {
            this.props.history.push("/");
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
    }
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
            {" "}
            <b>Sign Up</b>
          </h3>
          {this.state.valid ? <p></p> : <p>Check Your input and try again</p>}
          <label>Choose your user type :</label>
          <select
            name="typeUser"
            id="typeUser"
            type="text"
            className="form-control"
            ref={this.typeUserRef}
            required
          >
            <option value="Guest">Guest</option>
            <option value="Resturant">Resturant</option>
          </select>
          <div className="form-group mt-3 ">
            <label>Email address</label>
            <input
              ref={this.emailRef}
              type="email"
              className="form-control"
              placeholder="Enter email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              ref={this.passwordRef}
              type="password"
              className="form-control"
              placeholder="Enter password"
              pattern=".{6,}"
              title="6 or more characters"
              required
            />
          </div>

          <div className="form-group">
            <label>Repeat your Password</label>
            <input
              ref={this.repeat_passwordRef}
              type="password"
              className="form-control"
              placeholder="Enter your password again"
              required
            />
          </div>
          <div className="form-group">
            <label>Your secret answer</label>
            <input
              ref={this.answerRef}
              type="text"
              className="form-control"
              placeholder="What is your favorite color?"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary form-control"
            onClick={this.handleSubmit}
          >
            Join Us !
          </button>
          <p className="forgot-password text-right">
            Already registered go to_
            <Link className="navbar-brand" to={"/user/login"}>
              Login page
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
