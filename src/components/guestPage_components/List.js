import React from "react";
import ItemComp from "./ItemComp";
import * as ReactbootStrap from "react-bootstrap";
function List(props) {
  let onlyResturants = props.ProfileArr.filter(
    (item) => item.typeUser == "Resturant"
  );
  return (
    <div className="container-fluid mt-3 ">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {onlyResturants ? (
            !props.loading ? (
              onlyResturants.map((item) => {
                return (
                  <ItemComp
                    item={item}
                    key={item._id}
                    hourDealValue={props.hourDealValue}
                    categoryValue={props.categoryValue}
                    addToCart={props.addToCart}
                    user={props.user}
                  />
                );
              })
            ) : (
              <ReactbootStrap.Spinner animation="border" />
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
