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
import PaymentOnlineResponse from "./view/Invoice/PaymentOnlineResponse";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "./view/ErorPage/ServerError";
import BadRequest from "./view/ErorPage/BadRequest";
import NotFound from "./view/ErorPage/NotFound";

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
            <Route
              exact
              path={`/order/payment-response`}
              component={PaymentOnlineResponse}
            ></Route>
            <Route exact path={`/server-error`} component={ServerError}></Route>
            <Route exact path={`/bad-request`} component={BadRequest}></Route>
            <Route exact path={`/not-found`} component={NotFound}></Route>

            <Route path="/" component={Main}></Route>
          </Switch>
        </FooterPositioning>
      </AppProviderSearch>
    </AppProvider>
  );
}
