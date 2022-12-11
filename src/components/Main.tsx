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
import Dashboard from "../view/DashBoard/Dashboard";
import ShopDashBoard from "../view/ShopDashBoard/ShopDashboard";
import { CardInfo } from "./cart/CartInfo";
import NotFoundPage from "./NotFoundPage";
import Invoice from "../view/Invoice/Invoice";
import PaymentOnlineResponse from "../view/Invoice/PaymentOnlineResponse";

export default function Main() {
  const { role, setRole } = React.useContext(AppContext);
  const [pathAdmin, setPathAdmin] = React.useState(window.location.href);
  useEffect(() => {
    console.log("role", window.localStorage.getItem("role"));
    console.log("href", window.location.pathname);
    setPathAdmin(window.location.href);
    const role = window.localStorage.getItem("role") || "guest";
    setRole(role);
    console.log("role", role);
  }, [setRole]);
  return (
    <>
      {role ? (
        <div>
          {!pathAdmin.includes("dash-board") ? <Navigation /> : <></>}

          <Switch>
            <Route exact path={"/"} component={Home}></Route>
            <Route
              path={`/products/query=:query`}
              component={SearchResults}
            ></Route>
            <Route path={`/products`} component={ProductsPage}></Route>
            <Route path={`/product/:productId`} component={ProductView}></Route>
            <Route path={`/cart`} component={CardInfo}></Route>

            <Route path={`/profile`} component={Profile}>
              {role ? <Profile /> : <Redirect to="/sign-in" />}
            </Route>

            <Route path="/dash-board" component={Dashboard}>
              {role === "admin" ? <Dashboard /> : <Redirect to="/sign-in" />}
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

            <Route path="*" component={NotFoundPage}></Route>
          </Switch>
          <Footer />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
