import React from 'react';

import logoWhite from "../../@assets/logo.png";
import logoBlack from "../../@assets/logo-black.png";

import './style.css';

export const Spinner = (props) => {
    let logo = logoBlack;
    if (props.color === 'white') {
        logo = logoWhite;
    }

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