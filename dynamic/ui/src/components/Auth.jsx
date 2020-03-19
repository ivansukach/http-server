import React from 'react';
import {Link, Redirect } from "react-router-dom";


export default class Auth extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        this.props.loadData();
        setTimeout(() => {this.setState({redirect: "/main"})}, 100);
    }
    onLoginChange(event){
        this.props.setLogin(event.target.value);
    }
    onPasswordChange(event){
        this.props.setPassword(event.target.value);
    }
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.state = {
            redirect: null
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (

            <form id="SignIn">
                <div className="container">
                    <h1>LOGIN</h1>
                    <p>Please fill in this form to Login.</p>
                    <hr/>
                    <label htmlFor="Login"><b>Login</b></label>
                    <input type="text" id="login" placeholder="Enter Login" name="login" value={this.props.login}
                           onChange={this.onLoginChange} required/>
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" id="password" placeholder="Enter Password" name="password"
                           value={this.props.password} onChange={this.onPasswordChange} required/>
                        <button type="submit" className="registerbtn" onClick={this.onSubmit}> Login</button>
                </div>
                <div className="container signin">
                    <p>Create an account? <Link to="/signUp">Sign Up</Link></p>
                </div>
            </form>

        );
    }
}