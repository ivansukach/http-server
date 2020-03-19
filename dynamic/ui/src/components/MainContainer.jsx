import React from 'react';
import {connect} from 'react-redux';
import {loadData} from "../store/auth/actions";
import Main from './Main';

class MainContainer extends React.Component {
    render() {
        return <Main login={this.props.login} password={this.props.password}
                     loadData={this.props.loadData}/>;
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
    loadData
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);