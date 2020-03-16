import React from 'react';
import {createStore, applyMiddleware} from "redux";
import combineReducers from "./store/reducers"
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import AuthContainer from "./components/AuthContainer";
import RegistrationContainer from "./components/RegistrationContainer";
import {Connected} from "./components/Connected";
// import reducer from "./store/reducers"
import {watchLoadData} from "./store/sagas";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import Registration from "./components/Registration";
import Main from "./components/Main";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(combineReducers, applyMiddleware(logger, sagaMiddleware));


export default class App extends React.Component {
    constructor(props) {
        super(props);
        sagaMiddleware.run(watchLoadData);
    }
  render() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <AuthContainer />
                    </Route>
                    <Route exact path="/signUp">
                        <RegistrationContainer />
                    </Route>
                    <Route exact path="/connected">
                        <Connected />
                    </Route>
                    <PrivateRoute path="/main">
                        <Main />
                    </PrivateRoute>
                </Switch>
            </Router>

            {/*<RegistrationContainer />*/}
            {/*<Connected />*/}
        </Provider>
    );
  }
}
function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={props=>{(store.getState().auth.isAuthenticated === true) ? console.log("authenticated") : console.log("unauthenticated")}}

        />
    );
}
