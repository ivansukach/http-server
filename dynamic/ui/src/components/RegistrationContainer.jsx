import React from 'react';
import {connect} from 'react-redux';
import {
    sendDataToServer,
    setRepeatPasswordSignUp
} from "../store/registration/actions";
import Registration from './Registration';

class RegistrationContainer extends React.Component {
    render() {
        return <Registration ws={this.props.ws} sendDataToServer={this.props.sendDataToServer}
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
    sendDataToServer
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);