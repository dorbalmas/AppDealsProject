import React, { useState, useEffect, useRef } from "react";
import { apiGet, doApiPost } from "../../services/ApiServ";
import SingleUser from "./SingleUser";
import * as ReactbootStrap from "react-bootstrap";

const AdminTableSearch = (props) => {
  let [arr_list, setArr_list] = useState([]);
  let [loading, setloading] = useState(true);
  let myInput = useRef(null);

  let [searchI, setSearchI] = useState("");
  const search = () => {
    if (myInput.current.value) setSearchI(myInput.current.value);
    else setSearchI("");
  };
  const keyPressed = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };
  useEffect(() => {
    let url = "https://dealsproject.herokuapp.com/user/allUsers";

    if (searchI) {
      url = `https://dealsproject.herokuapp.com/user/searchUserByName/?resturantName=${searchI}`;
    }
    let timer = setTimeout(() => {
      apiGet(url).then((data) => {
        let onlyResturants = data.filter(
          (item) => item.typeUser === "Resturant"
        );
        setArr_list(onlyResturants);
        setloading(false);
      });
    }, 200);
    setloading(true);
    return () => clearTimeout(timer);
  }, [searchI]);

  const removeResturant = (_userId) => {
    doApiPost(
      "https://dealsproject.herokuapp.com/user/removeUser",
      _userId
    ).then((data) => {
      if (data.message === "deleted")
        apiGet("https://dealsproject.herokuapp.com/user/allUsers").then(
          (data) => {
            let onlyResturants = data.filter(
              (item) => item.typeUser === "Resturant"
            );
            setArr_list(onlyResturants);
          }
        );
    });
  };

  return (
    <div className="container-fluid pt-2">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="input-group col-lg-3 d-flex justify-content-center align-items-center">
            <input
              onKeyPress={keyPressed}
              ref={myInput}
              className="form-control border-right-0 border"
              type="search"
              placeholder="Search..."
            />
            <span className="input-group-append">
              <button
                onClick={search}
                className="btn btn-outline-info border-left-0 border"
                type="button"
              >
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
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
                  <th scope="col">Street</th>
                  <th scope="col">City</th>
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
