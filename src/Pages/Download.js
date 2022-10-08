import React,{useState} from 'react';
import './Css/Message.css';
import './Css/Download.css';

const Download = () => {

    return (
        <>
            <div className="mainbody mainbody2">     
                <div className='logodiv logodiv2'>
                    <img src="https://code240.github.io/assets/vipin/icons/icon.png" className='logo-ico' alt="incognito-logo" />
                </div> 

                <h1 className='appname'>
                    Incognito - anonymous messaging and chatting 💌🔒
                </h1>
                <h6 className="clicks">16+ clicks in last hour</h6>
                <button className='download-button'>Download</button>
            </div>
        </>
    )
}

export default Download;