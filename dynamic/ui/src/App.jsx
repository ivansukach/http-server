import React from 'react';
import {createStore} from "redux";
import combineReducers from "./store/reducers"
import {Provider} from "react-redux";
import AuthContainer from "./components/AuthContainer";
import RegistrationContainer from "./components/RegistrationContainer";

const store = createStore(combineReducers);

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            {/*<AuthContainer />*/}
            <RegistrationContainer />
        </Provider>
    );
  }
}

