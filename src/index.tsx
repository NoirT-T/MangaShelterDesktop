import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './react/app/app'
import {Provider} from "react-redux";
import {createStore} from "redux";
import allReducers from "./redux/reducers";

const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('Root')
);