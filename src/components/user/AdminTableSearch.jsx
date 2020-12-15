import React, { useState, useEffect } from "react";
import { apiGet, doApiPost } from "../../services/ApiServ";
import SingleUser from "./SingleUser";
import * as ReactbootStrap from "react-bootstrap";

const AdminTableSearch = (props) => {
  let [arr_list, setArr_list] = useState([]);
  let [loading, setloading] = useState(true);

  useEffect(() => {
    let url = "https://dealsproject.herokuapp.com/user/allUsers";
    if (props.match.params.qS) {
      url = `https://dealsproject.herokuapp.com/user/searchUserByName/?resturantName=${props.match.params.qS}`;
    }
    let timer = setTimeout(() => {
      apiGet(url).then((data) => {
        let onlyResturants = data.filter(
          (item) => item.typeUser == "Resturant"
        );
        setArr_list(onlyResturants);
        setloading(false);
      });
    }, 200);
    setloading(true);
    return () => clearTimeout(timer);
  }, [props.match]);

  const removeResturant = (_userId) => {
    doApiPost(
      "https://dealsproject.herokuapp.com/user/removeUser",
      _userId
    ).then((data) => {
      if (data.message == "deleted")
        apiGet("https://dealsproject.herokuapp.com/user/allUsers").then(
          (data) => {
            setArr_list(data);
          }
        );
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
                  <th scope="col">Resturant Name</th>
                  <th scope="col">City</th>
                  <th scope="col">Street</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              {arr_list.map((item) => {
                return (
                  <SingleUser
                    key={item._id}
                    item={item}
                    removeResturant={removeResturant}
                  />
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTableSearch;
