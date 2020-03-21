import React from 'react';
import {connect} from 'react-redux';
import {nextSlide, previousSlide, changeSlide, pauseSlideShow, loadSlideShow} from "../store/main/actions";
import Main from './Main';

class MainContainer extends React.Component {
    render() {
        return <Main loadSlideShow={this.props.loadSlideShow} nextSlide={this.props.nextSlide}
                     previousSlide={this.props.previousSlide} pauseSlideShow={this.props.pauseSlideShow}
        changeSlide={this.props.changeSlide}/>;
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
    loadSlideShow, nextSlide, previousSlide, pauseSlideShow, changeSlide
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);