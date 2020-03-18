import React from 'react';
import {connect} from 'react-redux';
import {setLogin} from "../store/registration/actions";
import {setPassword} from "../store/registration/actions";
import Registration from './Registration';

class RegistrationContainer extends React.Component {
    render() {
        return <Registration login={this.props.login} password={this.props.password} setLogin={this.props.setLogin}
                             setPassword={this.props.setPassword} />;
    }
}

const mapStateToProps = state => {
    console.log("state.registration.login");
    console.log(state.registration.login);
    return {
        login: state.registration.login,
        password: state.registration.password
    };
};

const mapDispatchToProps = {
    setLogin, setPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);