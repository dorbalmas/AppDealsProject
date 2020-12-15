import React, { useEffect, useState } from "react";
// import { doApiGet } from "../../services/apiService";

import DealItem from "./DealItem";

function ItemComp(props) {
  let item = props.item;
  let hourDealValue = props.hourDealValue;
  let categoryValue = props.categoryValue;
  console.log(hourDealValue + categoryValue);
  let filtered = item.dishDeals.filter((item) => item);

  if (categoryValue != "")
    filtered = item.dishDeals.filter((item) => item.category === categoryValue);

  if (hourDealValue != "")
    filtered = filtered.filter((item) => item.hoursOfDeal === hourDealValue);

  //   let [arr, setArr] = useState([]);
  //   let [url, setUrl] = useState(null);
  //   useEffect(() => {
  //     url = `https://www.omdbapi.com/?i=${item._id}&apikey=e04a6b04`;
  //     doApiGet(url).then((data) => {
  //       setArr(data);
  //     });
  //   }, [url]);

  //   const popup = () => {
  //     swal({
  //       content: {
  //         element: "ul",
  //         attributes: {
  //           innerHTML: filtered.map((item) => {
  //             <li> {item.category} </li>;
  //           }),
  //         },
  //       },
  //     });
  //   };
  return (
    <a
      //   onClick={popup}
      className="row border rounded mediaQ "
    >
      <img
        src={item.profile.image}
        className="col-lg-6  my-3 rounded "
        style={{ Height: "150px", width: "10px" }}
      />

      <div className="col-lg-6 mediaQ bg-light">
        <h1 className="display-3 text-info">
          <b>{item.profile.resturantName}</b>
          <p className="px-1 mb-5 h5 ">
            ({" "}
            {item.profile.kosherType == "Not"
              ? "Not Kosher"
              : item.profile.kosherType}{" "}
            )
          </p>
        </h1>
        <p className="px-1">{item.profile.city}</p>
        <p className="px-1">{item.profile.street}</p>
        <p className="px-1">{item.profile.phoneNumber}</p>
        <p className="px-1">
          {item.profile.openHour} - {item.profile.closeHour}
        </p>
        <textarea className="form-control-lg w-50" type="text">
          {item.profile.description}
        </textarea>
      </div>
      <div className="container row align-items-center justify-content-center">
        {filtered.map((item) => {
          return (
            <DealItem
              item={item}
              key={item._id}
              addToCart={props.addToCart}
              user={props.user}
            />
          );
        })}
      </div>
    </a>
  );
}

export default ItemComp;
