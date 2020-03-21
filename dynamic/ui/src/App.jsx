import React from 'react';
import {applyMiddleware, createStore} from "redux";
import combineReducers from "./store/reducers"
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import AuthContainer from "./components/AuthContainer";
import RegistrationContainer from "./components/RegistrationContainer";
import {Connected} from "./components/Connected";
import {watchLoadSignInData, watchLoadSignUpData} from "./store/sagas";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "./components/Main";
import MainContainer from "./components/MainContainer";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(combineReducers, applyMiddleware(logger, sagaMiddleware));


export default class App extends React.Component {
    constructor(props) {
        super(props);
        sagaMiddleware.run(watchLoadSignInData);
        sagaMiddleware.run(watchLoadSignUpData);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <AuthContainer/>
                        </Route>
                        <Route exact path="/signUp">
                            <RegistrationContainer/>
                        </Route>
                        <Route exact path="/connected">
                            <Connected/>
                        </Route>
                        <PrivateRoute path="/main">
                            <MainContainer/>
                        </PrivateRoute>
                    </Switch>
                </Router>

            </Provider>
        );
    }
}

function PrivateRoute({children, ...rest}) {

            return (
                <Route
                    {...rest}
                    render={props =>
                        {
                            if (store.getState().auth.isAuthenticated === true) {
                                return children;
                            }else{
                                return <Redirect to={{pathname: "/"}} />;
                            }
                        }
                    }
                />
            );

}

