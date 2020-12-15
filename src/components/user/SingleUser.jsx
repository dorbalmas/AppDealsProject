import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export function Td({ children, to }) {
  const ContentTag = to ? Link : "div";
  return (
    <td>
      <ContentTag
        className="form-control-range "
        to={to}
        style={{ color: "black", textDecoration: "none" }}
      >
        {children}
      </ContentTag>
    </td>
  );
}

const SingleUser = (props) => {
  let item = props.item;
  console.log(item.profile.resturantName);
  return (
    <tbody>
      <tr className="changeMeTr text-center">
        <Td>{item.profile.resturantName}</Td>
        <Td>{item.profile.street}</Td>
        <Td>{item.profile.city}</Td>

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
                  props.removeResturant(item);
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

export default SingleUser;
