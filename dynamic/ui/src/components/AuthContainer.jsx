import React from 'react';
import {connect} from 'react-redux';
import Auth from './Auth';

class AuthContainer extends React.Component {
    render() {
        return <Auth />;
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);