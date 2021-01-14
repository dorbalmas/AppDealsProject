import React from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Barcode } from "react-barcode";
export function Td({ children, to }) {
  const ContentTag = to ? Link : "div";
  return (
    <td>
      <ContentTag
        className="form-control-range "
        style={{ color: "black", textDecoration: "none" }}
        to={to}
      >
        {children}
      </ContentTag>
    </td>
  );
}

const OrderItem = (props) => {
  let item = props.item;
  console.log(item._id);

  //   const [showHidePopUp, setShowHidePopUp] = useState(false);
  //   const togglePopUp = (show, movieId, type = "") => {
  //     if (!show) {
  //       setMoveById(null);
  //       return setShowHidePopUp(show);
  //     }
  //     setShowHidePopUp(show);
  //     setMoveById(null);
  //     switch (type) {
  //       case "long":
  //         return Api.apiGetSingleLong(movieId).then((data) => {
  //           setMoveById(data);
  //         });

  //       default:
  //         return Api.apiGetSingleShort(movieId).then((data) => {
  //           setMoveById(data);
  //         });
  //     }
  //   };

  return (
    <tbody>
      <tr className="changeMeTr text-center">
        <Td>{props.counter}</Td>
        <Td>{item.orderDate}</Td>
        <Td>
          <p className="text-info">
            <b>{item.code}</b>
          </p>
        </Td>
        {/* 
        <Td>
          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.value) {
                  Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  props.removeDeal(item);
                }
              });
            }}
            className="btn-dark rounded h5 text-light"
          >
            X
          </button>
        </Td> */}
      </tr>
    </tbody>
  );
};

export default OrderItem;
