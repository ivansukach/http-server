import React from 'react';


export default class Auth extends React.Component {
    onSubmit(event){
        this.props.setCurrentUser(event.target.value);
    }
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
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
            <form id="SignIn">
                <div className="container">
                    <h1>LOGIN</h1>
                    <p>Please fill in this form to Login.</p>
                    <hr/>
                    <label htmlFor="Login"><b>Login</b></label>
                    <input type="text" placeholder="Enter Login" name="login" defaultValue={this.props.login} required/>
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" defaultValue={this.props.password} required/>
                    <button type="submit" className="registerbtn" onClick={this.onSubmit}> Login </button>
                </div>
                <div className="container signin">
                    <p>Create an account? <a href="/signUp.html">Sign Up</a>.</p>
                </div>
            </form>
        );
    }
}