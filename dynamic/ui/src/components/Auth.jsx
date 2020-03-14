import React from 'react';

import {createStore} from "redux";
import combineReducers from "../store/reducers"
import {Provider} from "react-redux";

{
    login,
        password
}
const store = createStore(combineReducers);
export default class Auth extends React.Component {
    onSubmit(){

    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         userData: {},
    //         stepNumber: 0,
    //         authCode: 0,
    //         xIsNext: true,
    //         items: [],
    //     };
    // }
    // componentDidMount(){
    // }
    // handleClick(e) {
    //     e.preventDefault();
    //     const SignIn=document.getElementById("SignIn");
    //     const data = new FormData(SignIn);
    //     fetch("http://localhost:8081/signIn", {method: 'POST', mode: 'cors', body: data})
    //         .then(response => response.json())
    //         .then((result) =>this.setState({userData: result}))
    //         .then(() => fetch("http://localhost:8081/restricted", {method: 'GET', mode: 'cors', headers: {
    //                 'Authorization': this.state.userData.Authorization,
    //                 'RefreshToken': this.state.userData.RefreshToken}})
    //             .then(resp=> this.setState({authCode: resp.status})));
    //
    // }

    render() {
        return (
            <Provider store={store}>
            <form id="SignIn">
                <div className="container">
                    <h1>LOGIN</h1>
                    <p>Please fill in this form to Login.</p>
                    <hr/>
                    <label htmlFor="Login"><b>Login</b></label>
                    <input type="text" placeholder="Enter Login" name="login" value={this.props.login} required/>
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={this.props.password} required/>
                    <button type="submit" className="registerbtn" onClick={(e) => this.handleClick(e)}> Login </button>
                </div>
                <div className="container signin">
                    <p>Create an account? <a href="/signUp.html">Sign Up</a>.</p>
                </div>
            </form>
            </Provider>
        );
    }
}