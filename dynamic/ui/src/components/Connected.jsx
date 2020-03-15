import React from 'react';
import {useDispatch} from "react-redux";
import { loadData } from '../store/auth/actions';


export const Connected = () => {
    const dispatch = useDispatch();
    const onClick = () => dispatch(loadData());


    return(
        <div>
            <button type="submit" className="registerbtn" onClick={onClick}>Register</button>
        </div>
    );
};
