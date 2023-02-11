import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import CartReducer from "./store/reducers/Cart";
import ItemsReducer from "./store/reducers/items";
import CustomerReducer from "./store/reducers/Customers";
import AuthReducer from "./store/reducers/auth";
import OrderReducer from "./store/reducers/Orders";
import WalletReducer from "./store/reducers/wallet";
// import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";
const persistConfig = {
  key: "persist-store",
  storage,
};
const Loading = () => {
  return <div>Loading New</div>;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
const authPersistConfig = { key: "auth", storage: storageSession };
const rootReducer = combineReducers({
  cart: CartReducer,
  items: ItemsReducer,
  customer: CustomerReducer,
  auth: persistReducer(authPersistConfig, AuthReducer),
  Orders: OrderReducer,
  wallet: WalletReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <App />
    </PersistGate>
  </Provider>
);
