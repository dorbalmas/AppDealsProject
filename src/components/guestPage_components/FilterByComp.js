import React, { useState, useEffect } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const FilterByComp = () => {
  let [KosherValue, setKosherValue] = useState("null");
  let [categoryValue, setCategotyValue] = useState("null");
  let [cityValue, setCityValue] = useState("null");
  let [hourDealValue, setHourDealValue] = useState("null");
  //   let arrayKosher = ["Kosher", "Show all", "Not kosher"];
  let arrayCategories = ["Pasta", "Pizza", "Burger", "Sushi", "Salad", "Steak"];
  let arrayCities = [
    "Tel Aviv",
    "Petah Tikva",
    "Herzelia",
    "Ramat Gan",
    "Kfar Saba",
    "Jaffo",
  ];
  let arrayHourDeals = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00",
    "22:00 - 00:00",
  ];

  const handleKosherChange = (val) => setKosherValue(val.target.id);
  const handleCategoryChange = (val) => setCategotyValue(val);
  const handleCityChange = (val) => setCityValue(val);
  const handleHourDealChange = (val) => setHourDealValue(val);
  console.log(KosherValue);
  console.log(categoryValue);
  console.log(cityValue);
  console.log(hourDealValue);
  //   const handleFormChange = () => {
  //     console.log(KosherValue);
  //     console.log(categoryValue);
  //     console.log(cityValue);
  //     console.log(hourDealValue);
  //   };
  return (
    <div className="container-fluid card p-0 m-0 ">
      {/* **********************Title****************** */}
      <div className="w-100 p-2 d-flex justify-content-center bg-secondary text-white font-italic h4">
        Filter by
      </div>
      {/* **********************Kosher******************** */}
      <div
        onChange={handleKosherChange}
        className="container ml-auto row d-flex justify-content-around m-auto"
      >
        <div className="p-0">
          <input id="Kosher" type="radio" name="radio" value="Kosher" />
          <label htmlFor="Kosher" className="pl-1 small">
            kosher
          </label>
        </div>
        <div className="p-0">
          <input id="Show all" type="radio" name="radio" value="Show all" />
          <label htmlFor="Show all" className="pl-1 small">
            Show all
          </label>
        </div>

        <div className="p-0">
          <input id="Not kosher" type="radio" name="radio" value="Not Kosher" />
          <label htmlFor="Not Kosher" className="pl-1 small ">
            Not kosher
          </label>
        </div>
      </div>
      <hr />
      {/* <ToggleButtonGroup
        value={KosherValue}
        onChange={handleKosherChange}
        type="radio"
        name="options"
        className="container row d-flex justify-content-center  m-auto switch-toggle switch-3 switch-candy"
      >
        {arrayKosher.map((kosher, idkosher) => (
          <ToggleButton
            key={idkosher}
            className="btn btn-light col-md-3 btn-sm m-1 p-1 text-dark"
            value={kosher}
          >
            {kosher}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <hr /> */}

      {/* ............City.............. */}
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
      <hr />
      {/* ............Category.............. */}
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
      <hr />
      {/* ...........Deals hours.............. */}
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
      <hr />
    </div>
  );
};
export default FilterByComp;
