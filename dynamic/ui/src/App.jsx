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
import {loadDataToRequest, putDataFromServer, redirectToMainPage, unauthenticated} from "./store/auth/actions";
import MainContainer from "./components/MainContainer";
import wsc from "./components/WebSocketConnection";
import logo from './logo.svg';
import './App.css';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(combineReducers, applyMiddleware(logger, sagaMiddleware));


export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("Creation wsc in App.jsx");
        this.state={
            wsc: new wsc("ws://localhost:8081/ws"),
            connected: false
        };
        sagaMiddleware.run(watchLoadSignInData);
        sagaMiddleware.run(watchLoadSignUpData);
        this.Connect();
        this.getMessages();
    }
    Connect() {
        let that = this;
        this.state.wsc.ws.onopen = function () {
            console.log('Connected');
            that.setState({...that.state, connected:true});
            that.render()
        }
    }
    getMessages() {
        let ws = this.state.wsc.ws;
        ws.onmessage = function (evt) {
            console.log("Message has been received");
            console.log(evt.data);
            let data = JSON.parse(evt.data);
            let content = JSON.parse(data.content);
            console.log("object", data);
            switch (data.type) {
                case "auth":
                    alert( 'Authentication' );
                    console.log("content: ", content);
                    console.log("content message: ", content.Message);
                    if (content.Code !== undefined) {
                        switch(content.Code){
                            case 400:
                                alert("Bad Request\n"+content.Message);
                                break;
                            case 401:
                                alert("Unauthorized\n"+content.Message);
                                break;
                            case 500:
                                alert("Internal Server Error\n"+content.Message);
                                break;
                        }
                        store.dispatch(unauthenticated());
                    } else {
                        store.dispatch(putDataFromServer(content));
                        store.dispatch(redirectToMainPage());
                    }
                    break;
                case "registration":
                    alert( 'Registration' );
                    console.log("content: ", content);
                    console.log("content message: ", content.Message);
                    if (content.Message !== undefined) {
                        alert(content.Message);
                        store.dispatch(unauthenticated());
                    }else {
                        store.dispatch(loadDataToRequest(store.getState().registration, ws));
                    }
                    break;
                default:
                    alert( "Unexpected type" );
            }
        };
    }

    render() {
        if (this.state.connected === false){
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>Подключение к серверу</p>
                    </header>
                </div>
            );
        } else {
            return (
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <AuthContainer ws={this.state.wsc.ws}/>
                            </Route>
                            <Route exact path="/signUp">
                                <RegistrationContainer ws={this.state.wsc.ws}/>
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

