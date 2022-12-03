import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
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
import SignIn from "./SignIn";
import Register from "./Register";
import Forgotpassword from "./change_for_password/forgotpassword";
import ChangePassword from "./change_for_password/changepassword";
import ShopDashBoard from "../view/ShopDashBoard/Dashboard";
import ScrollToTop from "../context/scrollToTop";
import { CardInfo } from "./ShopCart/CartInfo";

export default function Main() {
  const { role, setRole } = React.useContext(AppContext);

  useEffect(() => {
    setRole(window.localStorage.getItem("role"));
  }, [role]);
  return (
    <>
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/m" />
        </Route>
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/sign-up" component={Register}></Route>
        <Route path="/forgot-password" component={Forgotpassword}></Route>
        <Route path="/change-password" component={ChangePassword}></Route>
        {role ? (
          <>
            <Switch>
              {/* {role === "admin" && ( */}
              <Route path="/dash-board" component={Dashboard}></Route>
              {/* )} */}
              {/* {role === "shop" && ( */}
              <Route path="/shop-dash-board" component={ShopDashBoard}></Route>
              {/* )} */}

              {/* {(role === "customer" || role === undefined) && ( */}
              <Route
                path="/m"
                render={({ match: { url } }) => (
                  <>
                    <Navigation />
                    <Route
                      path={`${url}/products`}
                      component={ProductsPage}
                    ></Route>
                    <Route
                      path={`${url}/product/:productId`}
                      component={ProductView}
                    ></Route>
                    <Route path={`${url}/cart`} component={CardInfo}></Route>
                    <Route path={`${url}/profile`} component={Profile}></Route>
                    <Route
                      path={`${url}/order`}
                      component={OrderContainer}
                    ></Route>
                    <Route
                      path={`${url}/search/query=:query`}
                      component={SearchResults}
                    ></Route>
                    <Route path={`${url}/bill`} component={Invoice}></Route>

                    <Route exact path={`${url}`} component={Home}></Route>
                  </>
                )}
              />
              {/* )} */}
            </Switch>
            <Footer />
          </>
        ) : (
          <div></div>
        )}
      </BrowserRouter>
    </>
  );
}
