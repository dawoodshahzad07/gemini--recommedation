import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { useContext } from 'react';




const Main = () => {

    const handleSend = () => {
        onSent(input);
    };


    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input,handleCardClick } = useContext(Context)

    return (

        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">

                        <p>
    <span className="animated-gradient-text">Hello, Student!</span>
  </p>
                            <p>How can i help you today?</p>

                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleCardClick("Suggest Some best universities abroad in 1000$ budget.")}>
                                <p>Suggest Some best universities abroad in 1000$ budget.</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Best Universities in USA")}>
                                <p>Best Universities in USA</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Best Country for Study")}>
                                <p>Best Country for Study</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Best Tech related University ")}>
                                <p>Best Tech related University </p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>


                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ?
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                           {input? <img onClick={handleSend} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Main