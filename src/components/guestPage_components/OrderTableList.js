import React, { useState, useEffect } from "react";
import { apiGet } from "../../services/ApiServ";
import * as ReactbootStrap from "react-bootstrap";
import { useHistory } from "react-router-dom";
import OrderItem from "./OrderItem";

const OrderTableList = (props) => {
  let [arr_list, setArr_list] = useState([]);
  let [loading, setloading] = useState(true);
  let counter = 1;

  useEffect(() => {
    if (!localStorage["token"]) {
      useHistory.push("/");
    } else {
      let url = ` https://dealsproject.herokuapp.com/user/allOrdersPerUser/${props.userId}`;

      let timer = setTimeout(() => {
        apiGet(url).then((data) => {
          console.log(data);
          setArr_list(data);
          setloading(false);
        });
      }, 200);
      setloading(true);
      return () => clearTimeout(timer);
    }
  }, [props.userId]);

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        {loading ? (
          <div>
            <div style={{ height: "100px" }}></div>
            <ReactbootStrap.Spinner animation="border" />
          </div>
        ) : (
          <div
            className="row col-lg-10 justify-content-center text-center"
            style={{
              backgroundColor: "#566573",
              opacity: 0.93,
              minHeight: "400px",
            }}
          >
            <h1 className=" display-3 col-12 ">My History</h1>
            <h4 className=" h4 col-12 text-white ">
              Show the resturant your order code !{" "}
            </h4>

            <table className="table my-2 border rounded mx-5">
              <thead className="bg-secondary">
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Code</th>
                </tr>
              </thead>

              {arr_list.map((item) => {
                return (
                  <OrderItem key={item._id} item={item} counter={counter++} />
                );
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTableList;
