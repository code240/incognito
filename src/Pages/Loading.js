import './Css/Message.css';
import './Css/Download.css';
import './Css/Loading.css';

const Loading = () => {
    const loading = 'https://code240.github.io/assets/vipin/loading/loading14.gif';
    return (
        <>
            <div className="mainbody mainbody2">     
                <div className="loadingdiv">
                    <img src={loading} className="loading_img" alt="loading...." />
                </div>
            </div>
        </>
    )
}

export default Loading;