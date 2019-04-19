import React from 'react';

import logo from "../../@assets/logo-black.png";

import './style.css';

export const Spinner = (props) => {
    return (
        <div>
            <div className='overlay'></div>
            <div className='spinner text-center'>
                <img src={logo} />
                {props.children}                
            </div>
        </div>
    )
}