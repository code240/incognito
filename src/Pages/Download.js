import React,{useState,useEffect} from 'react';
import './Css/Message.css';
import './Css/Download.css';
import axios from 'axios';
import { VersionControlApi } from '../api/Api';

const Download = () => {
    const [applink, setApplink] = useState("");

    useEffect(() => {
        axios.get(`${VersionControlApi}/api/updateAppStatus`).then((resp) => {
            let y = resp.data;
            setApplink(y.appLink);
        }).catch(() => {
            
        })
    },[])
    
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
                <h6 className="clicks">{rand(3,11)}+ clicks in last hour</h6>
                <a href={applink} target="_blank" rel="noopener noreferrer">
                    <button className='download-button'>Download</button>   
                </a>
            </div>
        </>
    )
}

export default Download;