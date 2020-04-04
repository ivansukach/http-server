import React from 'react';
import {Link, Redirect } from "react-router-dom";
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";
import {putDataFromServer, redirectToMainPage, unauthenticated} from "../store/auth/actions";
const Input = ({ handler, touched, hasError, meta}) => (
    <div>
        <label htmlFor={`${meta.name}`}><b>{meta.label}</b></label>
        <input type={`${meta.type}`} placeholder={`Enter ${meta.label}`} name={`${meta.name}`} {...handler()}/>
        <span>{touched && hasError("required") && `${meta.label} is required`}</span>
    </div>
);
export default class Registration extends React.Component {
    loginForm = FormBuilder.group({
        login: ["", Validators.required],
        password: ["", Validators.required],
        rememberMe: false
    });

    handleSubmit=(e) => {
        e.preventDefault();
        console.log("Form values", this.loginForm.value);
        this.props.loadDataToRequest(this.loginForm.value, this.props.ws);
        // let that = this;
        // this.props.ws.onmessage = function (evt) {
        //     console.log(evt.data);
        //     let data = JSON.parse(evt.data);
        //     console.log("object", data);
        //     console.log("name", data.Name);
        //     console.log("surname", data.Surname);
        //     console.log("login", data.Login);
        //     console.log("dataFromServer: ", data);
        //     if (data.message === "Unauthorized") {
        //         that.props.unauthenticated();
        //     } else {
        //         that.props.putDataFromServer(data);
        //         that.props.redirectToMainPage();
        //     }
        // };
    };
    render() {
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect} />
        }
        return (
            <FieldGroup
                control={this.loginForm}
                render={({ get, invalid }) => (
                    <form id="SignIn" onSubmit={this.handleSubmit}>
                        <div className="container">
                        <h1>LOGIN</h1>
                        <p>Please fill in this form to Login.</p>
                        <hr/>
                            <FieldControl
                                name="login"
                                render={Input}
                                meta={{ label: "Login", name: "login", type: "text"}}
                            />

                            <FieldControl
                                name="password"
                                render={Input}
                                meta={{ label: "Password", name: "password", type: "password" }}
                            />

                            <FieldControl
                                name="rememberMe"
                                render={({handler}) => (
                                    <div>
                                        <label htmlFor="rememberMe"><b>Remember me</b></label>
                                        <input name="rememberMe" style={{width: 'auto', margin: '1vw'}}{...handler("checkbox")}/>
                                    </div>
                                )}
                            />
                        </div>
                        Please fill in this form to create an account.

                        Login
                        <button type="submit" disabled={invalid} className="registerbtn" onClick={this.onSubmit}>Login</button>
                        <div className="container signin">
                            <p>Create an account? <Link to="/signUp">Sign Up</Link></p>
                        </div>
                    </form>
                )}
            />
        );
    }
}

// export default class Auth extends React.Component {
//     onSubmit(e) {
//         e.preventDefault();
//         this.props.loadDataToRequest(this.props.login, this.props.password);
//     }
//     onLoginChange(event){
//         this.props.setLoginSignIn(event.target.value);
//     }
//     onPasswordChange(event){
//         this.props.setPasswordSignIn(event.target.value);
//     }
//     constructor(props) {
//         super(props);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.onLoginChange = this.onLoginChange.bind(this);
//         this.onPasswordChange = this.onPasswordChange.bind(this);
//     }
//
//     render() {
//         if (this.props.redirect) {
//             return <Redirect to={this.props.redirect} />
//         }
//         return (
//
//             <form id="SignIn">
//                 <div className="container">
//                     <h1>LOGIN</h1>
//                     <p>Please fill in this form to Login.</p>
//                     <hr/>
//                     <label htmlFor="Login"><b>Login</b></label>
//                     <input type="text" id="login" placeholder="Enter Login" name="login" value={this.props.login}
//                            onChange={this.onLoginChange} required/>
//                     <label htmlFor="password"><b>Password</b></label>
//                     <input type="password" id="password" placeholder="Enter Password" name="password"
//                            value={this.props.password} onChange={this.onPasswordChange} required/>
//                         <button type="submit" className="registerbtn" onClick={this.onSubmit}> Login</button>
//                 </div>
//                 <div className="container signin">
//                     <p>Create an account? <Link to="/signUp">Sign Up</Link></p>
//                 </div>
//             </form>
//
//         );
//     }
// }