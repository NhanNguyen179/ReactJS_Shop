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
import Main from "./components/Main";
import { Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Forgotpassword from "./components/change_for_password/forgotpassword";
import ChangePassword from "./components/change_for_password/changepassword";

export default function App() {
  return (
    <AppProvider>
      <AppProviderSearch>
        <FooterPositioning>
          <Switch>
            <Route exact path="/sign-in" component={SignIn}></Route>
            <Route exact path="/sign-up" component={Register}></Route>
            <Route
              exact
              path="/forgot-password"
              component={Forgotpassword}
            ></Route>
            <Route
              exact
              path="/change-password"
              component={ChangePassword}
            ></Route>
            <Route path="/" component={Main}></Route>
          </Switch>
        </FooterPositioning>
      </AppProviderSearch>
    </AppProvider>
  );
}
