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

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers, applyMiddleware(logger, sagaMiddleware));


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
                    {/*<PrivateRoute path="/protected">*/}
                    {/*    <ProtectedPage />*/}
                    {/*</PrivateRoute>*/}
                </Switch>
            </Router>

            {/*<RegistrationContainer />*/}
            {/*<Connected />*/}
        </Provider>
    );
  }
}

