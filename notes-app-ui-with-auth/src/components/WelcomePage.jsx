import React, { Fragment } from 'react';
import ImgLink from '../images/notes3.jpg';

const WelcomePage = () => (
    <Fragment>
        <div align='center'>
            <h2 style={{ color: 'pink' }}>
                Welcome to Your Handy Notes..!!!!
            </h2>          
        </div>
        <img src={ImgLink} alt="Notes App"  height="100%" width="100%"/>              
    </Fragment>
);

export default WelcomePage;