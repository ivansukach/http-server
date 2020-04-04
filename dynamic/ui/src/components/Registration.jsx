import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";
const Input = ({ handler, touched, hasError, meta}) => (
    <div>
        <label htmlFor={`${meta.name}`}><b>{meta.label}</b></label>
        <input type={`${meta.type}`} placeholder={`Enter ${meta.label}`} name={`${meta.name}`} {...handler()}/>
        <span>{touched && hasError("required") && `${meta.label} is required`}</span>
    </div>
);
export default class Registration extends React.Component {
    registrationForm = FormBuilder.group({
        login: ["", Validators.required],
        password: ["", Validators.required],
        repeatPassword: ["", Validators.required],
        name: ["", Validators.required],
        surname: ["", Validators.required],
        rememberMe: false
    });
    handleSubmit=(e) => {
        e.preventDefault();
        console.log("Form values", this.registrationForm.value);
        this.props.sendDataToServer(this.registrationForm.value, this.props.ws);
        // this.props.ws.onmessage = function (evt) {
        //     console.log(evt.data);
        //     let data = JSON.parse(evt.data);
        //     console.log("object", data);
        //     if (data.status === 200) {
        //         that.props.loadDataToRequest(that.registrationForm.value, that.props.ws);
        //     }else {
        //         alert(data.message);
        //         that.props.unauthenticated();
        //     }
        // };

        // if (data.status === 200) {
        //     const latestState = store.getState();
        //     yield put(loadDataToRequest(latestState.registration.login, latestState.registration.password));
        // } else {
        //     alert(data.message);
        //     yield put(unauthenticated());
        // }
    };
    render() {
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect} />
        }
        return (
            <FieldGroup
                control={this.registrationForm}
                render={({ get, invalid }) => (
                    <form onSubmit={this.handleSubmit}>
                        <div className="container">
                        <h1>REGISTRATION</h1>
                        <p>Please fill in this form to create an account.</p>
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
                            name="repeatPassword"
                            render={Input}
                            meta={{ label: "Repeat password", name: "repeatPassword", type: "password" }}
                        />
                        <FieldControl
                            name="name"
                            render={Input}
                            meta={{ label: "Name", name: "name", type: "text" }}
                        />

                        <FieldControl
                            name="surname"
                            type="text"
                            render={Input}
                            meta={{ label: "Surname", name: "surname", type: "text" }}
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
                        <hr/>
                            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                        <button type="submit" disabled={invalid} className="registerbtn" onClick={this.onSubmit}>Register</button>
                        <div className="container signin">
                            <p>Already have an account? <Link to="/">Sign in</Link></p>
                        </div>
                    </form>
                )}
            />
        );
    }
}
