import React from 'react';
import audio from './audio/pirates.mp3';
import photo from './img/usersImages/myface.jpg';
import pikachu from './img/pokemons/pikachu.gif';
import tortoise from './img/pokemons/tortose.gif';
import pokemon from './img/pokemons/giphy.gif';
import {Link} from "react-router-dom";
import Background from './img/bg.jpg';
import {store} from "../App";
import {changeSlide} from "../store/main/actions";


export default class Main extends React.Component {
    startGame(e){
        e.preventDefault();
        console.log("Current: ", store.getState().main.current);
        this.props.changeSlide(store.getState().main.current+1);
        //There I should get number of slide
    }
    onPreviousSlideBtnClick(){
        this.props.previousSlide();
        console.log("Current: ", store.getState().main.current);
    }
    onNextSlideBtnClick(){
        this.props.nextSlide();
        console.log("Current: ", store.getState().main.current);
    }
    onLoadSlideShow(){
        this.props.loadSlideShow(document.querySelectorAll('#slides .slide'));
    }

    constructor(props) {
        super(props);
        this.startGame=this.startGame.bind(this);
        this.onLoadSlideShow=this.onLoadSlideShow.bind(this);
        this.onPreviousSlideBtnClick=this.onPreviousSlideBtnClick.bind(this);
        this.onNextSlideBtnClick=this.onNextSlideBtnClick.bind(this);
        this.changeSlide=this.changeSlide.bind(this);
        this.state={
            slideIntervalTimeout: 4000
        };
    }
    componentDidUpdate() {
        console.log("Component Did Update");
        this.props.changeSlide(store.getState().main.current+1);
        console.log("Current: ", store.getState().main.current);

        // setTimeout(()=>{this.props.changeSlide(store.getState().main.current+1)}, this.state.slideIntervalTimeout);
    }
    changeSlide(){
        if (store.getState().main.status===true) {
            this.props.changeSlide(store.getState().main.current + 1);
        }
    }

    componentDidMount(){
        this.onLoadSlideShow();
        this.componentDidUpdate();
        let slideInterval = setInterval(this.changeSlide, this.state.slideIntervalTimeout);
        // let setInterval(this.props.changeSlide(store.getState().main.current+1), this.state.slideIntervalTimeout);
        // let index = 0;
        // for( ;; ){
        //     setTimeout(()=>{if(store.getState.main.status===false) return false }, 4000);
        //     this.props.changeSlide(++index);
        // }
        // let slides = document.querySelectorAll('#slides .slide');
        // let currentSlide = 0;
        // let slideInterval = setInterval(nextSlide, 4000);
        //
        // function nextSlide() {
        //     goToSlide(currentSlide + 1);
        // }
        //
        // function previousSlide() {
        //     goToSlide(currentSlide - 1);
        // }
        //
        // function goToSlide(n) {
        //     slides[currentSlide].className = 'slide';
        //     currentSlide = (n + slides.length) % slides.length;
        //     slides[currentSlide].className = 'slide showing';
        // }
        //
        // let playing = true;
        //
        // function pauseSlideshow() {
        //     playing = false;
        //     clearInterval(slideInterval);
        // }
        //
        // let next = document.getElementById('next');
        // let previous = document.getElementById('previous');
        // next.onclick = function() {
        //     pauseSlideshow();
        //     nextSlide();
        // };
        // previous.onclick = function() {
        //     pauseSlideshow();
        //     previousSlide();
        // };
    }


    render() {
        document.body.style.background = `url(${Background}) no-repeat`;
        document.body.style.backgroundSize = "cover";
        // document.onLoad=this.MainScript;
        console.log("RENDER");
        return (
            <div>
                <div id="authorized_user">
                    <audio id="bgSound" src={audio} autoPlay loop controls/>
                    <Link to="/profile" className="userMenuElements">My Profile</Link>
                    <Link to="/messages" className="userMenuElements">My Messages</Link>
                    <Link to="/events" id="events">My Events</Link>
                    <p id="username">Иван Сукач</p>
                    <Link to="/addPhoto" id="linkToChangePhoto">
                        <img src={photo} id="userPhoto"/>
                    </Link>
                </div>
                <div id="prompt">CHOOSE POKEMON</div>
                <div id="slideShow">
                    <button className="controls" id="previous" onClick={this.onPreviousSlideBtnClick}>&lt;</button>
                    <ul id="slides">
                        <li className="slide showing">
                            <img src={pikachu} width="100%" height="100%"/>
                        </li>
                        <li className="slide">
                            <img src={tortoise} width="100%" height="100%"/>
                        </li>
                        <li className="slide">
                            <img src={pokemon} width="100%" height="100%"/>
                        </li>
                    </ul>
                    <button className="controls" id="next" onClick={this.onNextSlideBtnClick}>&gt;</button>
                </div>
                <button id="start" onClick={this.startGame}>START</button>
                {/*    <script src="../js/users.js"></script>*/}
            </div>
    );

    }
    }