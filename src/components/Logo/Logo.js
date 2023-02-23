import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'


const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt style={{height: '10rem', width: '10rem'}} tiltMaxAngleX="55" tiltMaxAngleY="55">
                <div style={{backgroundColor: 'darkgreen' }} className='Tilt pa3 br2 shadow-2'>
                    <img style={{paddingTop: '5px'}} src={brain} alt="The logo" />
                </div>
            </Tilt> 
        </div>
    );
}

export default Logo;