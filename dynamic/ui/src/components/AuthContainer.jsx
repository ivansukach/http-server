import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser} from "../store/auth/actions";
import Auth from './Auth';

class AuthContainer extends React.Component {
    render() {
        return <Auth login={this.props.login} password={this.props.password} setCurrentUser={this.props.setCurrentUser}/>;
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.name,
        surname: state.auth.surname,
        login: state.auth.login,
        password: state.auth.password,
        photo: state.auth.photo,
        coins: state.auth.coins,
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken

    };
};

const mapDispatchToProps = {
    setCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);