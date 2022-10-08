import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'

import CartReducer from './store/reducers/Cart'
import ItemsReducer from './store/reducers/items';
import CustomerReducer from './store/reducers/Customers'
import AuthReducer from './store/reducers/auth';
import OrderReducer from './store/reducers/Orders';
import WalletReducer from './store/reducers/wallet';

const persistConfig ={
    key: 'persist-store',
    storage
}


const root = ReactDOM.createRoot(document.getElementById('root'));

const rootReducer = combineReducers({
    cart: CartReducer,
    items: ItemsReducer,
    customer:CustomerReducer,
    auth: AuthReducer,
    Orders : OrderReducer,
    wallet: WalletReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

const persistor = persistStore(store)

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
);

