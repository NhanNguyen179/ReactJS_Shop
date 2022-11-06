import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import CategoryPage from "./categoryView/CategoryView";
import ProductView from "./productView/ProductView";
import Cart from "./cart/Cart";
import SearchResults from "./SearchResults";
import SignIn from "../view/SignIn";
import Register from "../view/Register";
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import Invoice from "../view/Invoice/Invoice";
import Profile from "../view/Profile";

export default function Main() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route
          exact
          path="/category/:categoryId"
          component={CategoryPage}
        ></Route>
        <Route
          exact
          path='/profile'
          component={Profile}
        >
        </Route>
        <Route
          exact
          path="/product/:productId"
          component={ProductView}
        ></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route
          exact
          path="/search/query=:query"
          component={SearchResults}
        ></Route>
      </Switch>
      <Footer />
    </>
  );
}
