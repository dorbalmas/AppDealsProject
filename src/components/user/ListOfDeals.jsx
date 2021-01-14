import React, { useState, useEffect } from "react";
import { apiGet, doApiPost } from "../../services/ApiServ";
import Item from "./Item";
import * as ReactbootStrap from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ListOfDeals = (props) => {
  let [arr_list, setArr_list] = useState([]);
  let [loading, setloading] = useState(true);

  useEffect(() => {
    if (!localStorage["token"]) {
      useHistory.push("/");
    } else {
      let url = ` https://dealsproject.herokuapp.com/user/allDishesPerUser/${props.userId}`;
      // if (props.match.params.qS) {
      //   url = `https://ideodigitalDealproject.herokuapp.com/Deals/searchDeal/?q=${props.match.params.qS}`;
      // }
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

  const removeDeal = (_DealId) => {
    doApiPost(
      ` https://dealsproject.herokuapp.com/user/removeDish/${props.userId}/${_DealId._id}`,
      _DealId
    ).then((data) => {
      if (data.message === "deleted")
        apiGet(
          ` https://dealsproject.herokuapp.com/user/allDishesPerUser/${props.userId}`
        ).then((data) => {
          setArr_list(data);
        });
    });
  };

  return (
    <div className="container-fluid pt-2">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {loading ? (
            <div>
              <div style={{ height: "100px" }}></div>
              <ReactbootStrap.Spinner animation="border" />
            </div>
          ) : (
            <table className="table my-2 border rounded mx-5">
              <thead className="bg-warning">
                <tr className="text-center">
                  <th scope="col">Name</th>
                  <th scope="col">Original price</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Finel price</th>
                  <th scope="col">category</th>
                  <th scope="col">hoursOfDeal</th>
                  <th scope="col">description</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              {arr_list.map((item) => {
                return (
                  <Item key={item._id} item={item} removeDeal={removeDeal} />
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOfDeals;
