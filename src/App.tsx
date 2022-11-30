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
import { Switch } from "react-router-dom";


export default function App() {
  return (
    <AppProvider >
      <AppProviderSearch>
        <FooterPositioning>
          <Switch>
           <Main/>
          </Switch>
        </FooterPositioning>
      </AppProviderSearch>
    </AppProvider>
  );
}
