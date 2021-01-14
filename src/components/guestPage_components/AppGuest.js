import React, { useState, useEffect, useRef } from "react";
import List from "./List";
import { apiGet } from "../../services/ApiServ";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import * as ReactbootStrap from "react-bootstrap";
const AppGuest = (props) => {
  let [KosherValue, setKosherValue] = useState("");
  let [categoryValue, setCategotyValue] = useState("");
  let [cityValue, setCityValue] = useState("");
  let [hourDealValue, setHourDealValue] = useState("");
  let priceRefInput = useRef("");
  let [price, setPrice] = useState("");
  console.log(priceRefInput.current.value);
  let arrayCategories = props.arrayCategories;
  let arrayCities = props.arrayCities;
  let arrayHourDeals = props.arrayHourDeals;
  const handleKosherChange = (event) => setKosherValue(event);
  const handleCategoryChange = (event) => setCategotyValue(event);
  const handleCityChange = (event) => setCityValue(event);
  const handleHourDealChange = (event) => setHourDealValue(event);
  //   let filteredProfileObj = {
  //     KosherValue: KosherValue,
  //     cityValue: cityValue,

  //   };
  //   let filteredDishObj = {
  //     categoryValue: categoryValue,
  //   hourDealValue: hourDealValue,

  //   };

  //   const handleFormChange = () => {
  //     console.log(KosherValue);
  //     console.log(categoryValue);
  //     console.log(cityValue);
  //     console.log(hourDealValue);
  //   };

  //   ------------------------------------------------------------------------
  let [ProfileArr, setProfileArr] = useState([]);
  let [loading, setLoading] = useState(false);
  let [profileUrl, setProfileUrl] = useState(
    `https://dealsproject.herokuapp.com/user/allUsers`
  );
  //   let [cat, setcat] = useState("");
  //   let [h, seth] = useState("");
  const handleSubmit = (event) => {
    // let obj = {
    //   kosher: KosherValue.includes("Show all")
    //     ? (KosherValue = "")
    //     : KosherValue,
    //   city: cityValue,
    //   category: categoryValue,
    //   hours: hourDealValue,
    // };
    // console.log(obj);
    event.preventDefault();
    // setcat(categoryValue)
    // seth(hourDealValue)
    setProfileUrl(
      `https://dealsproject.herokuapp.com/user/getAllByTwoFilterKC/?kosherType=${
        KosherValue.includes("Show all") ? (KosherValue = "") : KosherValue
      }&city=${cityValue}`
    );
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      apiGet(profileUrl).then((data) => {
        setProfileArr(data);
        console.log(data);
      });
      setLoading(false);
    }, 300);
    setLoading(true);
    return () => clearTimeout(timer);
  }, [profileUrl]);

  return (
    <div className=" row " style={{ opacity: 0.93 }}>
      <form
        onSubmit={handleSubmit}
        className="col-lg-4 card p-0 m-0 "
        style={{ minHeight: "632px" }}
      >
        {/* **********************Title****************** */}
        <div className="w-100 p-2 d-flex justify-content-center bg-info text-white font-italic h4">
          Filter by
        </div>
        <hr />
        {/* **********************Kosher******************** */}
        <button
          className="btn btn-outline-info"
          onClick={() => {
            window.location.href = "/user/";
          }}
        >
          Reset Filter
        </button>
        <button className="btn btn-toolbar" autoFocus>
          <ToggleButtonGroup
            value={KosherValue}
            onChange={handleKosherChange}
            type="radio"
            name="options"
            className="container row d-flex justify-content-center  m-auto switch-toggle switch-3 switch-candy"
          >
            <ToggleButton
              key="1"
              className="btn btn-light col-md-3 btn-sm m-1 p-1 text-dark"
              value="Kosher"
            >
              Kosher
            </ToggleButton>
            <ToggleButton
              key="2"
              className="btn btn-light col-md-3 btn-sm m-1 p-1 text-dark"
              value="Not"
            >
              Not kosher
            </ToggleButton>
            <ToggleButton
              key="3"
              className="btn btn-light col-md-3 btn-sm m-1 p-1 text-dark"
              value="Show all"
            >
              Show all
            </ToggleButton>
          </ToggleButtonGroup>
        </button>
        <hr />
        {/* <div>
          <div
            onChange={handleKosherChange}
            className="container ml-auto row d-flex justify-content-around m-auto"
          >
            <div className=" p-0">
              <input id="Kosher" type="radio" name="radio" value="Kosher" />
              <label htmlFor="Kosher" className="pl-1 small">
                kosher
              </label>
            </div>
            <div className=" p-0">
              <input id="Show all" type="radio" name="radio" value="Show all" />
              <label htmlFor="Show all" className="pl-1 small">
                Show all
              </label>
            </div>

            <div className=" p-0">
              <input
                id="Not kosher"
                type="radio"
                name="radio"
                value="Not Kosher"
              />
              <label htmlFor="Not Kosher" className="pl-1 small ">
                Not kosher
              </label>
            </div>
          </div>
        </div>
        <hr /> */}

        {/* ............City.............. */}
        <button className="btn btn-toolbar">
          <ToggleButtonGroup
            value={cityValue}
            onChange={handleCityChange}
            type="radio"
            name="options"
            className="container-fluid row  d-flex justify-content-center m-auto"
          >
            {arrayCities.map((city, id) => (
              <ToggleButton
                key={id}
                className="btn btn-light btn-block btn-sm col-md-5 m-1 p-1 text-dark"
                value={city}
              >
                {city}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </button>
        <hr />
        {/* ............Category.............. */}
        <button className="btn btn-toolbar">
          <ToggleButtonGroup
            value={categoryValue}
            onChange={handleCategoryChange}
            type="radio"
            name="options"
            className="container row d-flex justify-content-center  m-auto switch-toggle switch-3 switch-candy"
          >
            {arrayCategories.map((category, id) => (
              <ToggleButton
                key={id}
                className="btn btn-light col-md-3 btn-sm m-1 p-1 text-dark"
                value={category}
              >
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </button>
        <hr />
        {/* ...........Deals hours.............. */}
        <button className="btn btn-toolbar">
          <ToggleButtonGroup
            value={hourDealValue}
            onChange={handleHourDealChange}
            type="radio"
            name="options"
            className="container row  d-flex justify-content-center m-auto "
          >
            {arrayHourDeals.map((hourDeal, id) => (
              <ToggleButton
                key={id}
                className="btn btn-light btn-block btn-sm col-md-5 m-1 p-1 text-dark"
                value={hourDeal}
              >
                {hourDeal}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </button>
        <hr />
        {/* ---------------------------------price--------------------------------------- */}
        <button className="btn btn-toolbar ">
          <label htmlFor="customRange1">
            Up to: <i className="fas fa-dollar-sign"></i> {price}
          </label>
          <input
            onChange={() => {
              setPrice(priceRefInput.current.value);
            }}
            type="range"
            className="custom-range"
            id="customRange1"
            min="1"
            max="200"
            ref={priceRefInput}
          />
        </button>
      </form>
      <div className="col-lg-8 card p-0 m-0 ">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ minheight: "400px" }}></div>
            <ReactbootStrap.Spinner
              animation="border"
              style={{
                position: "relative",
                width: "150px",
                height: "150px",
              }}
            />
          </div>
        ) : (
          <List
            ProfileArr={ProfileArr}
            loading={loading}
            categoryValue={categoryValue}
            hourDealValue={hourDealValue}
            price={price}
            addToCart={props.addToCart}
            userLogged={props.userLogged}
            user={props.user}
          />
        )}
      </div>
    </div>
  );
};

export default AppGuest;
