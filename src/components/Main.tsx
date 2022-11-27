import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import ProductView from "./productDetail/ProductView";
import SearchResults from "./SearchResults";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";
import ProductsPage from "./products/ProductsPage";
import Profile from "../view/Profile";
import OrderContainer from "./order/OrderContainer";
import { CardInfo } from "./ShopCart/CartInfo";
import { grey } from "@mui/material/colors";

export default function Main() {
  return (
    <div style={{ backgroundColor: grey[100] }}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/products" component={ProductsPage}></Route>
        <Route exact path="/product/:productId" component={ProductView}></Route>
        <Route exact path="/cart" component={CardInfo}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route exact path="/order" component={OrderContainer}></Route>

        <Route
          exact
          path="/search/query=:query"
          component={SearchResults}
        ></Route>
      </Switch>
      <Footer />
    </div>
  );
}
