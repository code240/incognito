import React from 'react';
import './Css/Message.css';
import './Css/Download.css';


const Sent = (props) => {
    
    const rand = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    return (
        <>
            <div className="mainbody mainbody2">     
                <div className='logodiv logodiv2'>
                    <img src="https://code240.github.io/assets/vipin/icons/icon.png" className='logo-ico' alt="incognito-logo" />
                </div> 

                <h1 className='appname'>
                    Incognito - anonymous messaging and chatting 💌🔒
                </h1>
                <h3 className='success'>
                    Your message has been sent successfully
                </h3>
                <h6 className="clicks">{rand(3,11)}+ clicks in last hour</h6>
                <a href={props.applink} target="_blank" rel="noopener noreferrer">
                    <button className='download-button'>Get your own messages</button>
                </a>
                <button className='btn btn-link btn-other' onClick={props.new}>send another message</button>
            </div>
        </>
    )
}

export default Sent;