import React, { Component } from "react";
import Swal from "sweetalert2";
import SingleProductCart from "./SingleProductCart";
import { PayPalButton } from "react-paypal-button-v2";
import { init } from "emailjs-com";
import { doApiPost } from "../../services/ApiServ";
init("user_UAEwjN4ZyTWrzLOmb2INF");
class Cart extends Component {
  state = { code: "", cartList: [] };
  Codes = [
    "5D82DC",
    "BFC9CA",
    "808Bc6",
    "2Bv2B9",
    "5b6573",
    "5D@2DC",
    "BF59CA",
    "807B96",
    "2BB2c9",
    "56s573",
    "5Dd2DC",
    "BFC9CA",
    "808B96",
    "2nB2B9",
    "566573",
    "5D8vDC",
    "BvC9CA",
    "80sd96",
    "2Bw2B9",
    "56a573",
    "1D82DC",
    "1FC9CA",
    "818B96",
    "21B2B9",
    "56#573",
  ];
  randonCode = this.Codes[Math.floor(Math.random() * this.Codes.length)];
  componentDidMount() {
    console.log(this.props.cart);
    if (!localStorage["token"]) {
      if (this.props.history) {
        this.props.history.push("/");
      } else {
        window.location.href = "/";
      }
    }
  }
  addPurches = async () => {
    let myObject = {
      code: this.state.code,
      cartList: this.state.cartList,
    };
    console.log(myObject);
    await doApiPost(
      ` https://dealsproject.herokuapp.com/user/addOrder/${this.props.userId}`,
      //   ` http://localhost:3033/user/addOrder/${this.props.userId}`,
      myObject
    ).then((data) => {
      if (this.props.history) {
        this.props.history.push("/user/OrderTableList");
      } else {
        window.location.href = "/user/OrderTableList";
      }
    });
  };

  render() {
    return (
      <div
        className="auth-inner"
        style={{ background: "lightgrey", opacity: 0.9 }}
      >
        <div className="row m-1 justify-content-center">
          <div className="row col-lg-10 justify-content-center text-center">
            <h5 className=" h3 col-12 ">
              Your payment is :{"  "} <i className="fas fa-dollar-sign"></i>
              {this.props.cartSize}
            </h5>
            <PayPalButton
              amount={this.props.cartSize}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={async (details) => {
                this.setState({ code: this.randonCode });
                this.setState({ cartList: this.props.cart });
                await Swal.fire({
                  icon: "success",
                  title: `Your Order Code ${this.state.code}`,
                  text:
                    "Transaction completed by " + details.payer.name.given_name,
                });
                this.props.cart.map((item) => {
                  item.amount = 0;
                  this.props.updateCart(item);
                });
                this.addPurches();
                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: this.props._id,
                  }),
                });
              }}
            />
            {this.props.cart.length > 0 ? (
              this.props.cart.map((i) => (
                <SingleProductCart
                  key={i._id}
                  item={i}
                  updateCart={this.props.updateCart}
                />
              ))
            ) : (
              <h1>Cart is Empty</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
