import React from 'react';


export default class Main extends React.Component {
    onSubmit() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        console.log("login: ", login);
        console.log("password: ", password);
        this.props.setCurrentUser(login, password);
        this.props.loadData();
    }


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

    }


    render() {
        return (
            <div>
                <div id="authorized_user">
                    <audio id="bgSound" src="../audio/pirates.mp3" autoPlay loop controls></audio>
                    <a href="/profile" style="margin:1%">My Profile</a>
                    <a href="/messages" style="margin:1%">My Messages</a>
                    <a href="/events" style="margin:1% 10% 1% 1%">My Events</a>
                    <p style="margin:1%">Иван Сукач</p>
                    <a href="/addPhoto" style="height: 100%;  display: flex">
                        <img src="../img/usersImages/myface.jpg" style="height: 100%; border-radius:15%" /></a>
                </div>
                {/*    <div id="prompt">CHOOSE POKEMON</div>*/}
                {/*    <div id="slideShow">*/}
                {/*        <button className="controls" id="previous">&lt;</button>*/}
                {/*        <ul id="slides">*/}
                {/*            <li className="slide showing"><img src="../img/pokemons/pikachu.gif" width="100%" height="100%"></li>*/}
                {/*            <li className="slide"><img src="../img/pokemons/tortose.gif" width="100%" height="100%"></li>*/}
                {/*            <li className="slide"><img src="../img/pokemons/giphy.gif" width="100%" height="100%"></li>*/}
                {/*        </ul>*/}
                {/*        <button className="controls" id="next">&gt;</button>*/}
                {/*    </div>*/}
                {/*    <button id="start">START</button>*/}

                {/*    <script src="../js/users.js"></script>*/}
                {/*    <script src="../js/main.js"></script>*/}
            </div>;


    );
    }
    }