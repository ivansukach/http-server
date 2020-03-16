import React from 'react';
// import body from './css/main.css';
import audio from './audio/pirates.mp3';
import photo from './img/usersImages/myface.jpg';
import pikachu from './img/pokemons/pikachu.gif';
import tortoise from './img/pokemons/tortose.gif';
import pokemon from './img/pokemons/giphy.gif';
import {Link} from "react-router-dom";
import Background from './img/bg.jpg';

const bodyStyle = {
    background: "url('./img/bg.jpg') no-repeat",
    backgroundSize: "cover",
    minHeight: "100%"
};

export default class Main extends React.Component {
    MainScript() {
        let slides = document.querySelectorAll('#slides .slide');
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 4000);

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function previousSlide() {
            goToSlide(currentSlide - 1);
        }

        function goToSlide(n) {
            slides[currentSlide].className = 'slide';
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].className = 'slide showing';
        }

        let playing = true;

        function pauseSlideshow() {
            playing = false;
            clearInterval(slideInterval);
        }

        let next = document.getElementById('next');
        let previous = document.getElementById('previous');
        next.onclick = function() {
            pauseSlideshow();
            nextSlide();
        };
        previous.onclick = function() {
            pauseSlideshow();
            previousSlide();
        };
    }
    startGame(e){
        e.preventDefault();
        //There I should get number of slide
    }

    constructor(props) {
        super(props);
        this.MainScript=this.MainScript.bind(this);
        this.startGame=this.startGame.bind(this)
    }


    render() {
        document.body.style.background = `url(${Background}) no-repeat`;
        document.body.style.backgroundSize = "cover";
        // document.onLoad=this.MainScript;
        return (
            <div onLoad={this.MainScript}>
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
                    <button className="controls" id="previous">&lt;</button>
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
                    <button className="controls" id="next">&gt;</button>
                </div>
                <button id="start" onClick={this.startGame}>START</button>
                {/*    <script src="../js/users.js"></script>*/}
            </div>
    );

    }
    }