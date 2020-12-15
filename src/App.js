import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoggedResturantPanel from "./components/loggedOrNot/LoggedResturant";
import LoggedAdminPannel from "./components/loggedOrNot/LoggedAdmin";
import LoggedGuestPanel from "./components/loggedOrNot/LoggedGuest";
import NotLoggedPanel from "./components/loggedOrNot/NotLogged";
import { verifyToken, userAddToCart } from "./services/UserServ";
import Login from "./components/user/login";
import Signup from "./components/user/signup";
import Cart from "./components/guestPage_components/cart";
import Profile from "./components/user/profile";
import Dishes from "./components/user/dishes";
import ListOfDeals from "./components/user/ListOfDeals";
import EditDeal from "./components/user/EditDeal";
import AppGuest from "./components/guestPage_components/AppGuest";
import AdminTableSearch from "./components/user/AdminTableSearch";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: null,
      logged: false,
      type: null,
    };
  }

  arrayCategories = ["Pasta", "Pizza", "Burger", "Sushi", "Salad", "Steak"];

  arrayCities = [
    "Tel Aviv",
    "Petah Tikva",
    "Herzelia",
    "Ramat Gan",
    "Kfar Saba",
    "Jaffo",
  ];
  arrayHourDeals = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00",
    "22:00 - 00:00",
  ];
  async componentDidMount() {
    const token = this.checkLocalStorage();
    if (token) {
      await verifyToken(token).then((data) => {
        this.setState({ type: data.body.typeUser }, () => {});
        if (data.logged)
          this.setState({ logged: true, userSession: data.body }, () => {});
        console.log(this.state.userSession.profile);
      });
    }
  }

  checkLocalStorage = () => {
    if (localStorage["token"]) {
      return localStorage.getItem("token");
    }
    return null;
  };

  userLogged = (user, token) => {
    localStorage.setItem("token", token);
    this.setState({ logged: true, userSession: user });
  };

  addToCart = (item) => {
    if (!this.state.logged) {
      window.location.href = "/user/login";
    } else {
      let found = 0;
      const copySession = { ...this.state.userSession };
      copySession.cart.map((inCart) => {
        if (inCart._id === item._id) {
          found = 1;
          inCart.amount += Number(item.amount);
        }
        return inCart;
      });
      if (!found) copySession.cart.push(item);
      this.setState({ userSession: { ...copySession } }, () => {
        userAddToCart(
          this.state.userSession._id,
          this.state.userSession.cart
        ).then((data) => console.log(data.body));
      });
    }
  };

  updateCart = (item) => {
    const sessionCopy = { ...this.state.userSession };
    if (item.amount === 0) {
      sessionCopy.cart = sessionCopy.cart.filter((i) => i._id !== item._id);
    } else {
      sessionCopy.cart.map((i) => {
        if (i._id === item.id) {
          i.amount = Number(item.amount);
        }
        return i;
      });
    }
    this.setState({ userSession: { ...sessionCopy } }, () => {
      userAddToCart(this.state.userSession._id, this.state.userSession.cart);
      console.log(this.state.userSession.cart);
    });
  };

  profileUpdate = (profile) => {
    const user = { ...this.state.userSession };
    user.profile = { ...profile };
    this.setState({ userSession: { ...user } });
  };
  //   dishUpdate = (dish) => {
  //     const user = { ...this.state.userSession };
  //     user.dish = { ...dish };
  //     this.setState({ userSession: { ...user } });
  //   };

  render() {
    return (
      <Router>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ height: "75px" }}></div>
            {/* {this.state.logged ? <LoggedResturantPanel /> : <NotLoggedPanel />} */}
            {this.state.logged && this.state.type == "Resturant" ? (
              <LoggedResturantPanel />
            ) : this.state.logged && this.state.type == "Admin" ? (
              <LoggedAdminPannel />
            ) : this.state.logged && this.state.type == "Guest" ? (
              <LoggedGuestPanel
                cartSize={
                  this.state.userSession
                    ? this.state.userSession.cart.reduce(
                        (result, i) => (result += Number(i.amount)),
                        0
                      )
                    : 0
                }
              />
            ) : (
              <NotLoggedPanel />
            )}
          </div>
          <div className="container-fluid"></div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <AppGuest
                  addToCart={this.addToCart}
                  userId={
                    this.state.userSession ? this.state.userSession._id : null
                  }
                  user={
                    this.state.userSession ? this.state.userSession.user : null
                  }
                />
              )}
            />

            <Route
              exact
              path="/user/cart"
              render={() => (
                <Cart
                  userId={
                    this.state.userSession ? this.state.userSession._id : null
                  }
                  user={
                    this.state.userSession ? this.state.userSession.user : null
                  }
                  cartSize={
                    this.state.userSession
                      ? this.state.userSession.cart.reduce(
                          (res, i) =>
                            (res +=
                              Number(i.priceAfterDiscount) * Number(i.amount)),
                          0
                        )
                      : 0
                  }
                  updateCart={this.updateCart}
                  cart={
                    this.state.userSession ? this.state.userSession.cart : []
                  }
                />
              )}
            />
            <Route
              exact
              path="/user/login"
              render={() => <Login login={this.userLogged} />}
            />
            <Route
              exact
              path="/user/signup"
              render={(routeProps) => (
                <Signup {...routeProps} signup={this.userLogged} />
              )}
            />
            <Route
              exact
              path="/user/resturants"
              render={(routeProps) => <AdminTableSearch {...routeProps} />}
            />
            <Route
              path="/user/profile"
              render={() => (
                <Profile
                  arrayCities={this.arrayCities}
                  profileUpdate={this.profileUpdate}
                  userId={
                    this.state.userSession ? this.state.userSession._id : null
                  }
                  user={
                    this.state.userSession
                      ? this.state.userSession.profile
                      : null
                  }
                />
              )}
            />
            <Route
              path="/user/dish"
              render={() => (
                <Dishes
                  arrayHourDeals={this.arrayHourDeals}
                  arrayCategories={this.arrayCategories}
                  userId={
                    this.state.userSession ? this.state.userSession._id : null
                  }
                  user={
                    this.state.userSession ? this.state.userSession.user : null
                  }
                />
              )}
            />
            <Route
              path="/user/DealList"
              render={() => (
                <ListOfDeals
                  userId={
                    this.state.userSession ? this.state.userSession._id : null
                  }
                  user={
                    this.state.userSession ? this.state.userSession.user : null
                  }
                />
              )}
            />
            <Route
              exact
              path="/user/singleDeal/:id"
              render={(routeProps) => (
                <EditDeal
                  {...routeProps}
                  arrayHourDeals={this.arrayHourDeals}
                  arrayCategories={this.arrayCategories}
                  userId={
                    this.state.userSession ? this.state.userSession._id : null
                  }
                  user={
                    this.state.userSession ? this.state.userSession.user : null
                  }
                />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
