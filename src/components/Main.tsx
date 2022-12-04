import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./home/Home";
import ProductView from "./productDetail/ProductView";
import SearchResults from "./SearchResults";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";
import ProductsPage from "./products/ProductsPage";
import Profile from "../view/Profile";
import OrderContainer from "./order/OrderContainer";
import React, { useEffect } from "react";
import { AppContext } from "../context/Context";
import Invoice from "../view/Invoice";
import Dashboard from "../view/DashBoard/Dashboard";
import ShopDashBoard from "../view/ShopDashBoard/ShopDashboard";
import { useHistory } from "react-router";
import { CardInfo } from "./cart/CartInfo";

export default function Main() {
  const { role, setRole } = React.useContext(AppContext);

  useEffect(() => {
    setRole(window.localStorage.getItem("role"));
  }, [role]);

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path={"/"} component={Home}></Route>
        <Route
          path={`/products/query=:query`}
          component={SearchResults}
        ></Route>
        <Route exact path={`/products`} component={ProductsPage}></Route>
        <Route path={`/product/:productId`} component={ProductView}></Route>
        <Route exact path={`/cart`} component={CardInfo}></Route>

        <Route exact path={`/profile`} component={Profile}>
          {role ? <Profile /> : <Redirect to="/sign-in" />}
        </Route>

        <Route path="/dash-board" component={Dashboard}>
           <Dashboard /> 

        </Route>

        <Route path="/shop-dash-board" component={ShopDashBoard}>
          {role === "shop" ? <ShopDashBoard /> : <Redirect to="/sign-in" />}
        </Route>

        <Route path={`/bill`} component={Invoice}>
         <Invoice /> 
        </Route>

        <Route path={`/order`} component={OrderContainer}>
          {role === "customer" ? (
            <OrderContainer />
          ) : (
            <Redirect to="/sign-in" />
          )}
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
