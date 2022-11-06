import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import CategoryPage from "./categoryView/CategoryView";
import ProductView from "./productView/ProductView";
import Cart from "./cart/Cart";
import SearchResults from "./SearchResults";
import SignIn from "../view/SignIn";
import Register from "../view/Register";
import Profile from "../view/Profile";

export default function Main() {
  return (
    <Switch>
      <Route exact path="/sign-in" component={SignIn}></Route>
      <Route exact path="/sign-up" component={Register}></Route>
      <Route exact path="/" component={Home}></Route>

      <Route
        exact
        path="/product/:categoryName"
        component={CategoryPage}
      >
      </Route>
      <Route
        exact
        path='/profile'
        component={Profile}
      >
      </Route>
      <Route
        exact
        path="/product/:categoryName/:id"
        component={ProductView}
      ></Route>
      <Route exact path="/cart" component={Cart}></Route>
      <Route
        exact
        path="/search/query=:query"
        component={SearchResults}
      ></Route>
    </Switch>
  );
}
