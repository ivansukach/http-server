import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    onLoginChange(event){
        console.log("event.target", event.target);
        console.log("event.target", event.target);
        console.log("event.target.value: ", event.target.login.value);
        this.props.setLogin(event.target.value);
        setTimeout(() => console.log("this.props.login: ", this.props.login), 1000)
    }
    onPasswordChange(event){
        this.props.setPassword(event.target.value);
    }
    render() {
        return (
            <form action="/signUp" method="post">
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>

                    <label htmlFor="login"><b>Login</b></label>
                    <input type="text" placeholder="Enter Login" name="login" onChange={this.onLoginChange} required/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required/>

                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" required/>

                    <label htmlFor="surname"><b>Surname</b></label>
                    <input type="text" placeholder="Enter surname" name="surname" required/>
                    <hr/>
                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                    <button type="submit" className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <Link to="/">Sign in</Link></p>
                </div>
            </form>

        );
    }
}