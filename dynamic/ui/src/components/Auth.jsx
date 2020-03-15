import React from 'react';
import {Link} from "react-router-dom";


export default class Auth extends React.Component {
    onSubmit() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        console.log("login: ", login);
        console.log("password: ", password);
        this.props.setCurrentUser(login, password);
        this.props.loadData();
    }


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

    }


    render() {
        return (

            <form id="SignIn">
                <div className="container">
                    <h1>LOGIN</h1>
                    <p>Please fill in this form to Login.</p>
                    <hr/>
                    <label htmlFor="Login"><b>Login</b></label>
                    <input type="text" id="login" placeholder="Enter Login" name="login" defaultValue={this.props.login}
                           required/>
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" id="password" placeholder="Enter Password" name="password"
                           defaultValue={this.props.password} required/>
                    <Link to="/main">
                        <button type="submit" className="registerbtn" onClick={this.onSubmit}> Login</button>
                    </Link>
                </div>
                <div className="container signin">
                    <p>Create an account? <Link to="/signUp">Sign Up</Link></p>
                </div>
            </form>

        );
    }
}