import React, { Component } from "react";
import OrderTableList from "./OrderTableList";
class ShoppingHistory extends Component {
  state = {};
  componentDidMount() {
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
      <div className=" row m-1 justify-content-center">
        <div
          className="row col-lg-10 justify-content-center text-center"
          style={{
            backgroundColor: "#566573",
            opacity: 0.93,
            minHeight: "400px",
          }}
        >
          <h1 className=" h1 col-12 ">My History</h1>
          <h4 className=" h4 col-12 ">Show the resturant your order code ! </h4>

          {this.props.cart.map((i) => (
            <OrderTableList
              key={i._id}
              item={i}
              cart={this.props.cart}
              updateCart={this.props.updateCart}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ShoppingHistory;
