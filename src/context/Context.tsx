import React, { createContext, useReducer, Dispatch } from "react";
import {
  productReducer,
  shoppingCartReducer,
  shoppingCartSubTotalReducer,
  ProductActions,
  ShoppingCartActions,
  ShoppingCartSubTotalActions,
} from "./Reducers";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: string;
  button: boolean;
  previousQuantity: string;
  currentQuantity: string;
  category: string;
  shopId?: any;
  shopName?: any;
};

type InitialStateType = {
  products: ProductType[];
  shoppingCart: number;
  shoppingCartSubTotal: number;
};

const initialState = {
  products: [],
  shoppingCart: 0,
  shoppingCartSubTotal: 0,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<
    ProductActions | ShoppingCartActions | ShoppingCartSubTotalActions
  >;
  invoice: any;
  setInvoice: (newValue: []) => void;
  auth: any;
  setAuth: (newValue: {}) => void;
  role: any;
  setRole: (newValue: any) => void;
}>({
  state: initialState,
  dispatch: () => null,
  invoice: [],
  auth: {},
  setInvoice: () => undefined,
  setRole: () => undefined,
  setAuth: () => undefined,
  role : "",
});

const mainReducer = (
  { products, shoppingCart, shoppingCartSubTotal }: InitialStateType,
  action: ProductActions | ShoppingCartActions | ShoppingCartSubTotalActions
) => ({
  products: productReducer(products, action),
  shoppingCart: shoppingCartReducer(products, shoppingCart, action),
  shoppingCartSubTotal: shoppingCartSubTotalReducer(
    products,
    shoppingCartSubTotal,
    action
  ),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [invoice, setInvoice] = React.useState<[]>([]);
  const [auth, setAuth] = React.useState<any>();
  const [role, setRole] = React.useState<any>();

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        invoice,
        setInvoice,
        auth,
        setAuth,
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
