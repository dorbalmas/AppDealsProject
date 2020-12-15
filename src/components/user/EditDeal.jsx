import React, { useEffect, useState } from "react";
import { apiGet, doApiPost } from "../../services/ApiServ";
import "semantic-ui-css/semantic.min.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const EditDeal = (props) => {
  let dealId = null;
  if (props.match) {
    dealId = props.match.params.id;
  }

  let [itemData, setItemData] = useState({});
  //   let [areaCode_ar, setareaCode] = useState([]);
  let [DropdownCategoryValue, setDropdownCategoryValue] = useState(null);
  let [DropdownHoursOfDealValue, setDropdownHoursOfDealValue] = useState(null);
  let history = useHistory();
  useEffect(() => {
    let url = `https://dealsproject.herokuapp.com/user/singleDish/${props.userId}/${dealId}`;
    apiGet(url).then((data) => {
      setItemData(data.dishDeals[0]);
    });
  }, [props.userId]);

  let optionsCategory = props.arrayCategories.map((item) => {
    return {
      key: item,
      value: item,
      text: item,
    };
  });
  let optionsHourDeals = props.arrayHourDeals.map((item) => {
    return {
      key: item,
      value: item,
      text: item,
    };
  });
  const changedCategory = (event, { value }) => {
    setDropdownCategoryValue(value);
  };
  const changedHours = (event, { value }) => {
    setDropdownHoursOfDealValue(value);
  };

  const editDeal = (event) => {
    event.preventDefault();

    let newObj = {
      _id: itemData._id,
      name: event.target.nameInput.value,
      priceBeforeDiscount: event.target.priceBeforeDiscountInput.value,
      discount: event.target.discountInput.value,
      priceAfterDiscount: event.target.priceAfterDiscountInput.value,
      category:
        DropdownCategoryValue == null
          ? itemData.category
          : DropdownCategoryValue,
      hoursOfDeal:
        DropdownHoursOfDealValue == null
          ? itemData.hoursOfDeal
          : DropdownHoursOfDealValue,
      description: event.target.descriptionInput.value,
    };
    console.log(newObj);
    doApiPost(
      `https://dealsproject.herokuapp.com/user/updateDish/${props.userId}/${dealId}`,
      newObj
    ).then((data) => {
      if (data) {
        if (data.message === "Error!! id is not found") {
          Swal.fire({
            icon: "error",
            title: "Error!!!",
            text:
              "This discount address is already in the system, please enter a different one!",
          });
        } else if (data.message) {
          Swal.fire({
            icon: "error",
            title: "Error!!!",
            text: "Please fill in all the blanks correctly!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Your Deal has been saved",
            showConfirmButton: false,
            timer: 2000,
          });
          history.push("/user/DealList");
        }
      }
    });
  };

  return (
    <div className="auth-wrapper pt-2 ">
      <form
        className="auth-inner"
        onSubmit={editDeal}
        style={{ backgroundColor: "lightGrey", opacity: 0.87 }}
      >
        <h3 style={{ color: "grey" }}>
          <b>Deal Editor</b>
        </h3>
        <div className="form-group">
          <input
            autoFocus
            id="nameInput"
            type="text"
            className="form-control "
            defaultValue={itemData.name}
          />
        </div>
        <div className="form-group">
          <input
            id="priceBeforeDiscountInput"
            type="number"
            className="form-control "
            defaultValue={itemData.priceBeforeDiscount}
          />
        </div>
        <div className="form-group">
          <input
            id="discountInput"
            type="number"
            className="form-control "
            defaultValue={itemData.discount}
          />
        </div>
        <div className="form-group">
          <input
            id="priceAfterDiscountInput"
            type="number"
            className="form-control "
            defaultValue={itemData.priceAfterDiscount}
          />
        </div>
        <div className="form-group">
          <Dropdown
            className=" form-control"
            defaultValue={itemData.category}
            placeholder={itemData.category}
            search
            options={optionsCategory}
            onChange={changedCategory}
          />
        </div>
        <div className="form-group ">
          <Dropdown
            className=" form-control"
            defaultValue={itemData.hoursOfDeal}
            placeholder={itemData.hoursOfDeal}
            search
            options={optionsHourDeals}
            onChange={changedHours}
          />
        </div>
        <div className="form-group">
          <textarea
            id="descriptionInput"
            className="form-control "
            type="text"
            rows="4"
            defaultValue={itemData.description}
          />
        </div>
        <button className="btn btn-warning">Edit Here</button>
      </form>
    </div>
  );
};

export default EditDeal;
