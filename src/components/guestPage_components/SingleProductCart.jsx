import React, { Component } from "react";
import Swal from "sweetalert2";

class SingleProductCart extends Component {
  state = {};

  inputRef = React.createRef();
  colors = ["#D5D8DC", "#BFC9CA", "#808B96", "#ABB2B9", "#566573"];
  randonColor = this.colors[Math.floor(Math.random() * this.colors.length)];

  imgs = [
    "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706__340.jpg",
    "https://cdn.pixabay.com/photo/2018/06/10/17/39/market-3466906__340.jpg",
    "https://cdn.pixabay.com/photo/2017/04/25/08/02/coffee-beans-2258839__340.jpg",
    "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
  ];

  handleClick = () => {
    if (this.inputRef.current.value < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href>Why do I have this issue?</a>",
      });
    } else {
      this.props.item.amount = Number(this.inputRef.current.value);
      this.props.updateCart(this.props.item);
    }
  };

  render() {
    return (
      <div
        className="d-flex flex-column align-items-center p-2 border border-dark border-darken-2 m-1"
        style={{ backgroundColor: this.randonColor }}
      >
        {/* <img className="img-thumbnail" src={this.props.item.image} alt="" /> */}
        <p
          className="img-thumbnail form-control text-white"
          style={{
            height: "50px",
            backgroundImage: `url(${
              this.imgs[Math.floor(Math.random() * this.imgs.length)]
            })`,
          }}
        >
          <b>{this.props.item.name}</b>
        </p>
        <p>
          Price: {this.props.item.priceAfterDiscount * this.props.item.amount}
        </p>
        <input
          className="form-control w-75"
          ref={this.inputRef}
          type="number"
          min={0}
          defaultValue={this.props.item.amount}
        />{" "}
        <button
          onClick={this.handleClick}
          className="btn btn-sm btn-outline-success form-control w-75 border border-1 m-2"
        >
          Update Amount
        </button>
      </div>
    );
  }
}

export default SingleProductCart;
