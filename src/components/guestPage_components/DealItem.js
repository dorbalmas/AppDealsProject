import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Popup } from "semantic-ui-react";
// import { doApiGet } from "../../services/apiService";
import Swal from "sweetalert2";

function DealItem(props) {
  let item = props.item;
  let history = useHistory();
  let myAmountRefInput = useRef(null);

  let colors = ["#D5D8DC", "#BFC9CA", "#808B96", "#ABB2B9", "#566573"];
  let randonColor = colors[Math.floor(Math.random() * colors.length)];

  let comment = [
    "Buy me!",
    "Choose me!",
    "this is a great Deal!",
    "This deal have an amazing price!",
  ];
  let randComment = comment[Math.floor(Math.random() * comment.length)];

  const handleClick = () => {
    if (!props.userLogged) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Sign Up in order to add deals!!!",
        confirmButtonText: "SignUp page",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/user/signup");
        }
      });
    } else if (myAmountRefInput.current.value < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href>Why do I have this issue?</a>",
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `deal **${item.name}** added successfully to your CART!`,
        showConfirmButton: false,
        timer: 2000,
      });
      item.amount = Number(myAmountRefInput.current.value);
      console.log(item.amount);
      props.addToCart(item);
    }
  };
  return (
    <Popup
      content={randComment}
      trigger={
        <div className="col-lg-6">
          <a
            className=" border rounded mediaQ  rcorners1 "
            style={{ minHeight: "200px", minWidth: "100px" }}
            style={{
              backgroundColor: randonColor,
            }}
          >
            <div
              className=" mediaQ text-center "
              style={{ backgroundColor: randonColor, borderRadius: "25px" }}
            >
              <h1 className=" px-1 display-4 ">{item.name}</h1>
              <p className="px-1 bg-info text-white">{item.discount} OFF!</p>
              <p className="px-1">
                <b>{item.category} deal:</b> {item.description}
              </p>
              <p className="px-1">
                Deal price: <del>{item.priceBeforeDiscount}</del>{" "}
                <b>
                  !!! <ins>{item.priceAfterDiscount}</ins> !!!
                </b>
              </p>
              <p className="px-1">Deal time range: {item.hoursOfDeal}</p>
              <input
                className="form-control  mb-3  "
                type="number"
                ref={myAmountRefInput}
                min={1}
                defaultValue={1}
              />{" "}
              <button
                onClick={handleClick}
                className="btn btn-outline-light mb-3 "
              >
                <b> - Add - </b>
              </button>
            </div>
          </a>
        </div>
      }
    />
  );
}

export default DealItem;
