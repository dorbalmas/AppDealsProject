import React, { Component } from "react";
import { userAvatarUpdate, userProfileUpdate } from "../../services/UserServ";
import { Form } from "react-bootstrap";
import * as ReactbootStrap from "react-bootstrap";
import Swal from "sweetalert2";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      file: null,
      allowed: [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/bmp",
        "image/gif",
      ],
      updated: 0,
    };
  }
  arrayHours = [
    "08:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  resturantName = React.createRef();
  street = React.createRef();
  city = React.createRef();
  phoneNumber = React.createRef();
  openHour = React.createRef();
  closeHour = React.createRef();
  kosherType = React.createRef();
  description = React.createRef();
  componentDidMount() {
    console.log(this.props.user);
    if (!localStorage["token"]) {
      if (this.props.history) {
        this.props.history.push("/");
      } else {
        window.location.href = "/";
      }
    } else if (this.props.user) {
      this.setState({ profile: { ...this.props.user } });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.updated !== this.state.updated ||
      prevProps.user !== this.props.user
    ) {
      this.setState({
        profile: { ...this.props.user },
      });
    }
  }

  fileAdder = (e) => {
    if (!this.state.allowed.includes(e.target.files[0].type)) {
      //   swal.fire("Only Image types allowed!");
      Swal.fire({
        title: "Only Image types allowed!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      this.setState({ file: e.target.files[0] });
    }
  };
  handleFileUpload = async () => {
    const file = new FormData();
    if (this.state.file) {
      file.append("userAvatar", this.state.file);
      let data = await userAvatarUpdate(this.props.userId, file);
      if (data.uploaded) {
        console.log(this.props.user);
        this.props.user.image = data.body;
        this.setState({ updated: this.state.updated + 1 });
      } else {
        alert("Server Issue, Try again Later");
      }
    }
  };
  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.handleProfileUpdate();
    }
  };
  handleProfileUpdate = async () => {
    if (
      this.resturantName.current.value == "" ||
      this.city.current.value == "" ||
      this.street.current.value == "" ||
      this.phoneNumber.current.value == "" ||
      this.openHour.current.value == "" ||
      this.closeHour.current.value == "" ||
      this.kosherType.current.value == "" ||
      this.description.current.value == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the blanks!!",
      });
    } else {
      const prof = {
        resturantName: this.resturantName.current.value,
        city: this.city.current.value,
        street: this.street.current.value,
        phoneNumber: this.phoneNumber.current.value,
        openHour: this.openHour.current.value,
        closeHour: this.closeHour.current.value,
        kosherType: this.kosherType.current.value,
        description: this.description.current.value,
      };
      let data = await userProfileUpdate(this.props.userId, prof);
      if (data.updated) {
        this.props.profileUpdate(data.body);
        this.setState({
          updated: this.state.updated + 1,
        });

        if (this.props.history) {
          this.props.history.push("/user/dish");
        } else {
          window.location.href = "/user/dish";
        }
      } else {
        alert("Server Issue, Try again Later");
      }
    }
  };

  render() {
    return this.state.profile ? (
      <div className="auth-wrapper pt-2 ">
        <div
          onKeyPress={this.keyPressed}
          className="auth-inner"
          style={{ background: "lightgrey", opacity: 0.9 }}
        >
          <h3 style={{ color: "grey" }}>
            <b>Resturant Profile</b>
          </h3>
          <img
            defaultValue="https://aqueous-brook-65256.herokuapp.com/img/default-avatar.jpg"
            className="card-img w-100 mb-2 "
            src={this.state.profile.image}
            alt=""
          />
          <div className="row justify-content-center">
            <input
              className="form-control-file"
              type="file"
              name="userAvatar"
              onChange={this.fileAdder}
            />
            <button
              onClick={this.handleFileUpload}
              className="btn  btn-outline-success form-control mb-3"
            >
              Upload
            </button>
          </div>
          <div className="form-group">
            <input
              ref={this.resturantName}
              className="form-control "
              type="text"
              defaultValue={this.state.profile.resturantName}
            />
          </div>
          <div className="form-group">
            <div className="form-group">
              <Form.Control
                as="select"
                custom
                ref={this.kosherType}
                defaultValue={this.state.profile.kosherType}
              >
                <option selected hidden>
                  Is your restaurant kosher or not kosher?
                </option>
                <option value="Kosher">Kosher</option>
                <option value="Not">Not Kosher</option>
              </Form.Control>
            </div>
            <Form.Control
              as="select"
              custom
              ref={this.city}
              defaultValue={this.state.profile.city}
            >
              <option selected hidden>
                Choose city..
              </option>
              {this.props.arrayCities.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="form-group">
            <input
              ref={this.street}
              className="form-control "
              type="text"
              defaultValue={this.state.profile.street}
            />
          </div>
          <div className="form-group">
            <input
              ref={this.phoneNumber}
              className="form-control "
              type="text"
              defaultValue={this.state.profile.phoneNumber}
            />
          </div>

          <div className="row justify-content-between form-group">
            <Form.Control
              as="select"
              custom
              ref={this.openHour}
              defaultValue={this.state.profile.openHour}
            >
              <option selected hidden>
                Open hour..
              </option>
              {this.arrayHours.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </Form.Control>

            <Form.Control
              as="select"
              custom
              ref={this.closeHour}
              defaultValue={this.state.profile.closeHour}
            >
              <option selected hidden>
                Close hour..
              </option>
              {this.arrayHours.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="form-group">
            <textarea
              ref={this.description}
              className="form-control "
              type="text"
              rows="4"
              form="usrform"
              defaultValue={this.state.profile.description}
            />
          </div>
          <button
            onClick={this.handleProfileUpdate}
            className="btn btn-success form-control"
          >
            Save Changes
          </button>
        </div>
      </div>
    ) : (
      <div className="d-flex justify-content-center align-items-center">
        <div style={{ height: "400px" }}></div>
        <ReactbootStrap.Spinner
          animation="border"
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
          }}
        />
      </div>
    );
  }
}

export default Profile;
