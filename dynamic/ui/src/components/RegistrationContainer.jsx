import React from 'react';
import {connect} from 'react-redux';
import {
    setLoginSignUp,
    setPasswordSignUp,
    setNameSignUp,
    setSurnameSignUp,
    sendDataToServer,
    setRepeatPasswordSignUp
} from "../store/registration/actions";
import Registration from './Registration';

class RegistrationContainer extends React.Component {
    render() {
        return <Registration login={this.props.login} password={this.props.password} repeatPassword={this.props.repeatPassword}
                             name={this.props.name} surname = {this.props.surname}
                             setLoginSignUp={this.props.setLoginSignUp} setPasswordSignUp={this.props.setPasswordSignUp}
                             setRepeatPasswordSignUp={this.props.setRepeatPasswordSignUp} setNameSignUp={this.props.setNameSignUp}
                             setSurnameSignUp={this.props.setSurnameSignUp} sendDataToServer={this.props.sendDataToServer}
                             redirect={this.props.redirect}/>;
    }
}

const mapStateToProps = state => {
    return {
        login: state.registration.login,
        password: state.registration.password,
        repeatPassword: state.registration.repeatPassword,
        name: state.registration.name,
        surname: state.registration.surname,
        redirect: state.auth.redirect
    };
};

const mapDispatchToProps = {
    setLoginSignUp, setPasswordSignUp, setRepeatPasswordSignUp, setNameSignUp, setSurnameSignUp, sendDataToServer
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);