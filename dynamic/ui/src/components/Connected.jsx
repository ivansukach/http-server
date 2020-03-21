import React from 'react';
import {useDispatch} from "react-redux";
import { loadDataToRequest } from '../store/auth/actions';


export const Connected = () => {
    const dispatch = useDispatch();
    const onClick = () => dispatch(loadDataToRequest());


    return(
        <div>
            <button type="submit" className="registerbtn" onClick={onClick}>Register</button>
        </div>
    );
};
