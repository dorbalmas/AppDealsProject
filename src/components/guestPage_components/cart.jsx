import React, { Component } from "react";

import SingleProductCart from "./SingleProductCart";
import { PayPalButton } from "react-paypal-button-v2";
class Cart extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props.cartSize);
    console.log(this.props.cart.length);
    if (!localStorage["token"]) {
      if (this.props.history) {
        this.props.history.push("/");
      } else {
        window.location.href = "/";
      }
    }
  }

  render() {
    return (
      <div
        className="auth-inner"
        style={{ background: "lightgrey", opacity: 0.9 }}
      >
        <div className="row m-1 justify-content-center">
          <div className="row col-lg-10 justify-content-center text-center">
            <h5 className=" h3 col-12 ">
              Your payment is :{"  "}
              {this.props.cartSize}
              <i className="fas fa-shekel-sign m-3 text-success"></i>
            </h5>
            <PayPalButton
              amount={this.props.cartSize}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details) => {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );

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
