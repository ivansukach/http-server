import React from 'react';
import {connect} from 'react-redux';
import {loadDataToRequest, putDataFromServer, redirectToMainPage, unauthenticated} from "../store/auth/actions";
import Auth from './Auth';

class AuthContainer extends React.Component {
    render() {
        return <Auth ws={this.props.ws}
            redirect={this.props.redirect} unauthenticated={this.props.unauthenticated}
            putDataFromServer={this.props.putDataFromServer} redirectToMainPage={this.props.redirectToMainPage}
        loadDataToRequest={this.props.loadDataToRequest} />;
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
    loadDataToRequest, unauthenticated, putDataFromServer, redirectToMainPage
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);