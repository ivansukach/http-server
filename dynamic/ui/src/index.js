import React from 'react';
import ReactDOM from 'react-dom';
import Auth from "./components/Auth";
import './index.css';
import AuthContainer from "./components/AuthContainer";


ReactDOM.render(
    <AuthContainer/>,
    document.getElementById('form-container')
);
