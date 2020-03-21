import React from 'react';
import {Link, Redirect} from "react-router-dom";

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onLoginChange(event){
        this.props.setLoginSignUp(event.target.value);
    }
    onPasswordChange(event){
        this.props.setPasswordSignUp(event.target.value);
    }
    onNameChange(event){
        this.props.setNameSignUp(event.target.value);
    }
    onSurnameChange(event){
        this.props.setSurnameSignUp(event.target.value);
    }
    onSubmit(e){
        e.preventDefault();
        this.props.sendDataToServer(this.props.login, this.props.password, this.props.name, this.props.surname);
    }

    render() {
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect} />
        }
        return (
            <form>
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>

                    <label htmlFor="login"><b>Login</b></label>
                    <input type="text" placeholder="Enter Login" name="login" value={this.props.login} onChange={this.onLoginChange} required/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={this.props.password} onChange={this.onPasswordChange} required/>

                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" value={this.props.name} onChange={this.onNameChange} required/>

                    <label htmlFor="surname"><b>Surname</b></label>
                    <input type="text" placeholder="Enter surname" name="surname" value={this.props.surname} onChange={this.onSurnameChange} required/>
                    <hr/>
                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                    <button type="submit" className="registerbtn" onClick={this.onSubmit}>Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <Link to="/">Sign in</Link></p>
                </div>
            </form>

        );
    }
}