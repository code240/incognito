import React, { useState,useEffect } from 'react';
// import { useSearchParams } from "react-router-dom";
import "./Css/Message.css";
import Download from './Download';
import Loading from './Loading';
import Sent from './Sent';
import { api } from '../api/Api';
import axios from 'axios';
import Questions from './../StaticData/Questions';

const Message = (props) => {
    const [msg,setMsg] = useState("");
    const [msgLength,setMsgLength] = useState(300);

    const [sendBtnVisiblity,setSendBtnVisiblity] = useState(true);
    const [downloadOption,setDownloadOption] = useState(true);
    const [downloadPage,setDownloadPage] = useState(false);
    const [sentPage,setSentPage] = useState(false);
    const [loadingPage,setLoadingPage] = useState(false);
    const [messagePage,setMessagePage] = useState(false);
    const [userDetails,setUserDetails] = useState({});
    const [questionText,setQuestionText] = useState("")
    const [questionNumber,setQuestionNumber] = useState(0);
    const [receiver,setReceiver] = useState("");

    // const [searchParams] = useSearchParams();
    // let q = searchParams.get("user");
    // if(q != null){
    //     q = q.trim();
    //     q = q.toLowerCase();
    // }


    
    // let url = window.location.href;
    // url = url.split("/")
    // let user = "x";
    // let question = -1;
    // if(props.q === "default"){        
    //     user = url[url.length - 1];
    // }
    // if(props.q === "exist"){
    //     user = url[url.length - 2];
    //     question = parseInt(url[url.length - 1]);
    // }

    let user = props.match.params.user;
    let question = props.match.params.question;
    if(question === undefined){
        question = -1;
    }
    useEffect(() => {
        if(user != null){
            setSentPage(false);
            setMessagePage(false);
            setDownloadPage(false);
            setLoadingPage(true);
            axios.post(`${api}/api/verify_user_by_username`,{
                username : user,
            }).then((response) => {
                setLoadingPage(false);
                if(response.data.error === true){
                    setDownloadPage(true);
                    return true;
                }
                setMessagePage(true);
                setUserDetails(response.data.result);
                if(question === -1){
                    question = parseInt(response.data.result.ques);
                    setQuestionText(Questions[question].question)
                    setQuestionNumber(question);
                }else{
                    let x = parseInt(question);
                    setQuestionNumber(x-1)
                    setQuestionText(Questions[question-1].question)
                }
                setReceiver(response.data.result.inc_id)
                // console.log(response.data.result);
            }).catch(() => {
                setLoadingPage(false);
                setDownloadPage(true);
                return true;
            })
        }
    },[user])

    
    


    const typeMsg = (e) => {
        if(e.target.value.length > 300){
            let x = e.target.value;
            setMsg(x.slice(0,300));
            setMsgLength(0);
            return true;
        }
        setMsg(e.target.value);
        setMsgLength(300-e.target.value.length);

    }

    const send = () => {
        if(msg.length === 0){return true;}
        if(msg.length < 3){
            alert("Message length must be greater than 3 chars");
            return true;
        }
        setSendBtnVisiblity(false);
        axios.post(`${api}/api/saveAnonymousMessage`,{
            receiver : receiver,
            msg :  msg,
            ques : questionNumber,
        }).then((response) => {
            if(response.data.error === true){
                alert("Message sending error!! Please try again");
                setSendBtnVisiblity(true);
                return true;
            }
            // Success case
            if(response.data.istokens === true){
                let tokens = response.data.tokens;
                tokens = tokens.map(item => item.token);
                tokens.map((toke) => {
                    sendPushNotification(toke,"You have a new message 💌","Check out your anonymous message!! 😛😛");
                })
            }
            setMessagePage(false);
            setSentPage(true);
            setSendBtnVisiblity(true);
            setMsg("");
            setMsgLength(300);
            setDownloadOption(true);
        }).catch(() => {
            setSendBtnVisiblity(true);
            alert("Message sending error!! Please try again");
        })
    }



    const sendAnother = () => {
        // alert("hii")
        setSentPage(false);
        setMessagePage(true);
    }

    if(user===null){
        return(<>
            <Download />
        </>)
    }

    if(loadingPage){
        return (
            <Loading />
        )
    }

    if(downloadPage){
        return (
            <Download />
        )
    }
    if(sentPage){
        return (
            <Sent new={sendAnother} />
        )
    }

    if(messagePage){ 
        let img = "";
        if(userDetails.avtar === '0'){
            img = `https://incognito-avtar.vipinraocreation.tech/avtars/${userDetails.img_url}`;
        }else{
            img  = `https://code240.github.io/assets/vipin/avtars/avtar${userDetails.avtar}.png`;
        }
        return (
            <>
                <div className="mainbody">
                    <div className='logodiv'> 
                        <img src="https://code240.github.io/assets/vipin/icons/screen-logo.png" className='logo-ico' alt="incognito-logo" />
                    </div>
                    <div className="mainwrapper">
                        <div className="upper">
                            <div className="upper-left">
                                <div className="dpdivwrap">
                                    <img src={img} className='avtar' alt='user_avtar' />
                                </div>
                            </div>
                            <div className="upper-right">
                                <h5 className='username-text'>
                                    @{userDetails.unique_name}
                                </h5>
                                <h6 className="question-text">
                                    {questionText}
                                </h6>
                            </div>
                            <div className="cb"></div>
                        </div>
                        <div className='lower'>
                            <textarea value={msg} onFocus={()=>setDownloadOption(false)} onBlur={()=>setDownloadOption(true)} onChange={(e) => typeMsg(e)} placeholder='Send me a anonymous message' className='text-input'></textarea>
                            
                            {
                                sendBtnVisiblity ? (
                                    <button className="send-btn" onClick={send}>
                                        <span className="material-symbols-rounded">
                                            send
                                        </span>
                                    </button>
                                ) : (
                                    <button className='send-btn send-loading'><div className="loading"></div></button>
                                )
                            }
                            <label className='word-count'>{msgLength} chars</label>
                        </div>
                    </div>
                    <p className='guidetext'>
                        Your identity will be kept secret. He/She will not know that you have sent this message. 🔒
                    </p>

                    {
                        downloadOption ? (
                            <div className="bottom">
                                <h1 className="text1">👇 incognito!! Download the app now 👇</h1>
                                <div className='urturnBtn'>
                                    Create your own link and get messages 
                                </div>
                            </div>
                        )  : null
                    }
                    
                </div>
            </>
        )
    }
}
export default Message;


async function sendPushNotification(expoPushToken,title,msg) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: msg,
      data: { screen: 'msg' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }