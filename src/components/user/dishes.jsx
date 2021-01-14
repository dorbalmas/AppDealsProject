import Swal from "sweetalert2";
import React, { Component } from "react";
import { apiGet, doApiPost } from "../../services/ApiServ";
import { Form } from "react-bootstrap";
// import { userResturantDishAvatar } from "../../services/UserServ";
class Dishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: true,
      dishId: "",
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

  name = React.createRef();
  priceBeforeDiscount = React.createRef();
  discount = React.createRef();
  priceAfterDiscount = React.createRef();
  category = React.createRef();
  hoursOfDeal = React.createRef();
  description = React.createRef();

  componentDidMount() {
    if (!localStorage["token"]) {
      if (this.props.history) {
        this.props.history.push("/");
      } else {
        window.location.href = "/";
      }
    } else if (this.props.user) {
      this.setState({ dish: { ...this.props.user } });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.updated !== this.state.updated ||
      prevProps.user !== this.props.user
    ) {
      this.setState({
        dish: { ...this.props.user },
      });
    }
  }

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.sendForm();
    }
  };
  sendForm = async () => {
    // event.preventDefault();
    if (
      this.name.current.value === "" ||
      this.priceBeforeDiscount.current.value === "" ||
      this.discount.current.value === "" ||
      this.priceAfterDiscount.current.value === "" ||
      this.category.current.value === "" ||
      this.hoursOfDeal.current.value === "" ||
      this.description.current.value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the blanks!!",
      });
    } else {
      const newObj = {
        name: this.name.current.value,
        priceBeforeDiscount: this.priceBeforeDiscount.current.value,
        discount: this.discount.current.value,
        priceAfterDiscount: this.priceAfterDiscount.current.value,
        category: this.category.current.value,
        hoursOfDeal: this.hoursOfDeal.current.value,
        description: this.description.current.value,
      };

      console.log(newObj);
      console.log(this.state.file);
      await doApiPost(
        ` https://dealsproject.herokuapp.com/user/addDish/${this.props.userId}`,
        newObj
      ).then(async (data) => {
        if (data) {
          //   await this.handleFileUpload();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your new deal has been saved",
            showConfirmButton: false,
            timer: 2000,
          });
          if (this.props.history) {
            this.props.history.push("/user/DealList");
          } else {
            window.location.href = "/user/DealList";
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server Issue, Try again Later",
            footer: "<a href>Why do I have this issue?</a>",
          });
        }
      });
    }
  };

  //   fileAdder = (e) => {
  //     if (!this.state.allowed.includes(e.target.files[0].type)) {
  //       //   swal.fire("Only Image types allowed!");
  //       Swal.fire({
  //         title: "Only Image types allowed!",
  //         showClass: {
  //           popup: "animate__animated animate__fadeInDown",
  //         },
  //         hideClass: {
  //           popup: "animate__animated animate__fadeOutUp",
  //         },
  //       });
  //     } else {
  //       this.setState({ file: e.target.files[0] });
  //     }
  //   };

  //   handleFileUpload = async () => {
  //     const file = new FormData();
  //     if (this.state.file) {
  //       file.append("userResturantDishAvatar", this.state.file);

  //       await apiGet(
  //         `https://dealsproject.herokuapp.com/user/allDishesPerUser/${this.props.userId}`
  //       ).then((dataDish) => {
  //         console.log(dataDish[dataDish.length - 1]._id);
  //         this.setState({ dishId: dataDish[dataDish.length - 1]._id });
  //       });
  //       let data = await userResturantDishAvatar(
  //         this.props.userId,
  //         this.state.dishId,
  //         file
  //       );

  //       if (data) {
  //         this.setState({ updated: this.state.updated + 1 });
  //       } else {
  //         Swal.fire({
  //           title: "Server Issue, Try again Later",
  //           showClass: {
  //             popup: "animate__animated animate__fadeInDown",
  //           },
  //           hideClass: {
  //             popup: "animate__animated animate__fadeOutUp",
  //           },
  //         });
  //       }
  //     }
  //   };

  render() {
    return this.state.dish ? (
      <div
        onKeyPress={this.keyPressed}
        onSubmit={this.sendForm}
        className="auth-wrapper pt-2 "
      >
        <div
          className="auth-inner"
          style={{ background: "lightgrey", opacity: 0.9 }}
        >
          <h3 style={{ color: "grey" }}>
            <b>New Deal</b>
          </h3>
          {/* <img
            defaultValue="https://aqueous-brook-65256.herokuapp.com/img/default-avatar.jpg"
            className="card-img w-100 mb-2 "
            src={this.state.dish.image}
            alt=""
          /> */}
          <div className="row justify-content-center">
            {/* <input
              className="form-control-file"
              type="file"
              name="userResturantDishAvatar"
              onChange={this.fileAdder}
            /> */}
            {/* <button
              onClick={this.handleFileUpload}
              className="btn  btn-outline-success form-control mb-3"
            >
              Upload
            </button> */}
          </div>
          <div className="form-group">
            <input
              ref={this.name}
              className="form-control "
              type="text"
              placeholder="Dish name"
              defaultValue={this.state.dish.name}
            />
          </div>
          <div className="form-group">
            <input
              ref={this.priceBeforeDiscount}
              className="form-control "
              type="number"
              placeholder="Original price.."
              defaultValue={this.state.dish.priceBeforeDiscount}
            />
          </div>
          <div className="form-group">
            <input
              ref={this.discount}
              className="form-control "
              type="number"
              placeholder="Discount.."
              defaultValue={this.state.dish.discount}
            />
          </div>
          <div className="form-group">
            <input
              ref={this.priceAfterDiscount}
              className="form-control "
              type="number"
              placeholder="Finel price.."
              defaultValue={this.state.dish.priceAfterDiscount}
            />
          </div>

          <div className="form-group">
            <Form.Control
              as="select"
              custom
              ref={this.category}
              defaultValue={this.state.dish.category}
            >
              <option selected hidden>
                Choose the type of dish..
              </option>
              {this.props.arrayCategories.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </div>

          <div className="form-group ">
            <Form.Control
              as="select"
              custom
              ref={this.hoursOfDeal}
              defaultValue={this.state.dish.hoursOfDeal}
            >
              <option selected hidden>
                Choose the deal time..
              </option>
              {this.props.arrayHourDeals.map((item, id) => (
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
              placeholder="Deal description.."
              defaultValue={this.state.dish.description}
            />
          </div>
          <button
            onClick={this.sendForm}
            className="btn btn-primary form-control"
          >
            Add Deal!!!
          </button>
        </div>
      </div>
    ) : (
      <h2 className="text-center">Loading...</h2>
    );
  }
}

export default Dishes;
