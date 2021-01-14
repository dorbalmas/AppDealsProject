import React from "react";
const CartPopUp = ({ item, setPopUp }) => {
  return item ? (
    <div className="dark_box">
      <div className="close" onClick={() => setPopUp(false, null)}>
        X
      </div>
      <img
        className="card-img-top mt-1"
        src={item.Poster === "N/A" ? "/default.jpg" : item.Poster}
        alt={item.Title}
      />
      <div className="card-body">
        <h5 className="card-title">{item.Title}</h5>
        <h5>Release: {item.Year}</h5>
        <p className="card-text plotScrol">{item.Plot}</p>
        <div className="d-flex justify-content-around">
          <button onClick={() => setPopUp(true, item.imdbID, "long")}>
            Get More info
          </button>
          <button onClick={() => setPopUp(false, null)}>Close</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="dark_box">
      <LoaderAnimation></LoaderAnimation>
    </div>
  );
};

export default CartPopUp;
