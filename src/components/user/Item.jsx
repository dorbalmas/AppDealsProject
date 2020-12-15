import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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

const Item = (props) => {
  let item = props.item;
  console.log(item._id);

  return (
    <tbody>
      <tr className="changeMeTr text-center">
        <Td to={`/user/singleDeal/${item._id}`}>{item.name}</Td>
        <Td to={`/user/singleDeal/${item._id}`}>
          {item.priceBeforeDiscount} <i className="fas fa-shekel-sign"></i>
        </Td>
        <Td to={`/user/singleDeal/${item._id}`}>
          {item.discount}
          <b> %</b>
        </Td>
        <Td to={`/user/singleDeal/${item._id}`}>
          {item.priceAfterDiscount} <i className="fas fa-shekel-sign"></i>
        </Td>
        <Td to={`/user/singleDeal/${item._id}`}>{item.category}</Td>
        <Td to={`/user/singleDeal/${item._id}`}>{item.hoursOfDeal}</Td>
        <Td to={`/user/singleDeal/${item._id}`}>{item.description}</Td>

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
        </Td>
      </tr>
    </tbody>
  );
};

export default Item;
