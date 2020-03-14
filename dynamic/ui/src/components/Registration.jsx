import React from 'react';
export default class Auth extends React.Component {

    render() {
        return (
            <form action="/signUp" method="post">
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>

                    <label htmlFor="Login"><b>Login</b></label>
                    <input type="text" placeholder="Enter Login" name="login" required/>

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
                    <p>Already have an account? <a href="/">Sign in</a>.</p>
                </div>
            </form>

        );
    }
}