import React from "react";
import "./style/App.css";
import "./style/Navbar.css";
import "./style/Home.css";
import "./style/CategoryView.css";
import "./style/ProductView.css";
import "./style/NotAvailable.css";
import "./style/CartPreview.css";
import "./style/Cart.css";
import "./style/Footer.css";
import "./style/Search.css";
import "./style/SearchResults.css";

import { AppProvider } from "./context/Context";
import { AppProviderSearch } from "./context/ContextSearch";
import FooterPositioning from "./context/FooterPositioning";
import Navigation from "./components/common/Navigation";
import Main from "./components/Main";
import Footer from "./components/common/Footer";
import { Switch, Route } from "react-router-dom";
import SignIn from "./view/SignIn";
import Register from "./view/Register";
import Invoice from "./view/Invoice/Invoice";

export default function App() {
  return (
    <AppProvider>
      <AppProviderSearch>
        <FooterPositioning>
          <Switch>
            <Route exact path="/sign-in" component={SignIn}></Route>
            <Route exact path="/sign-up" component={Register}></Route>
            <Route exact path="/bill/:id" component={Invoice}></Route>
            <Route path="/" component={Main}></Route>
          </Switch>
        </FooterPositioning>
      </AppProviderSearch>
    </AppProvider>
  );
}
