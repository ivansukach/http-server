import React from 'react';
import {connect} from 'react-redux';
import {setLoginSignUp, setPasswordSignUp, setNameSignUp, setSurnameSignUp, sendDataToServer} from "../store/registration/actions";
import Registration from './Registration';

class RegistrationContainer extends React.Component {
    render() {
        return <Registration login={this.props.login} password={this.props.password} name={this.props.name}
                             surname = {this.props.surname} setLoginSignUp={this.props.setLoginSignUp}
                             setPasswordSignUp={this.props.setPasswordSignUp} setNameSignUp={this.props.setNameSignUp}
                             setSurnameSignUp={this.props.setSurnameSignUp} sendDataToServer={this.props.sendDataToServer}
                             redirect={this.props.redirect}/>;
    }
}

const mapStateToProps = state => {
    return {
        login: state.registration.login,
        password: state.registration.password,
        name: state.registration.name,
        surname: state.registration.surname,
        redirect: state.auth.redirect
    };
};

const mapDispatchToProps = {
    setLoginSignUp, setPasswordSignUp, setNameSignUp, setSurnameSignUp, sendDataToServer
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);