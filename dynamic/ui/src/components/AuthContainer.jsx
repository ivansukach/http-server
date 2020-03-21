import React from 'react';
import {connect} from 'react-redux';
import {loadDataToRequest, setLoginSignIn, setPasswordSignIn} from "../store/auth/actions";
import Auth from './Auth';

class AuthContainer extends React.Component {
    render() {
        return <Auth login={this.props.login} password={this.props.password} redirect={this.props.redirect}
        loadDataToRequest={this.props.loadDataToRequest} setLoginSignIn={this.props.setLoginSignIn} setPasswordSignIn={this.props.setPasswordSignIn} />;
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
        refreshToken: state.auth.refreshToken,
        redirect: state.auth.redirect
    };
};

const mapDispatchToProps = {
    loadDataToRequest, setLoginSignIn, setPasswordSignIn
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);