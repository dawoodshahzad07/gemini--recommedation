import React, { useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { useContext } from 'react';

const Main = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [showInitialContent, setShowInitialContent] = useState(true); // State to track if initial content is shown

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, handleCardClick } = useContext(Context);

    useEffect(() => {
        if (showResult) {
            setShowInitialContent(false); // Hide initial content when result is shown
        }
    }, [showResult]);

    const handleSend = async () => {
        await onSent(input);
        setShowInitialContent(false); // Hide initial content after sending the input
    };

    const handleCardSelection = (prompt) => {
        handleCardClick(prompt);
        setSelectedCard(prompt);
        setShowInitialContent(true); // Show initial content when a card is selected
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
            </div>
            <div className="main-container">
                {showInitialContent && !showResult ? (
                    <>
                        <div className="greet">
                            <p>
                                <span className="animated-gradient-text">Hello, Student!</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="search-box">
                            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                {input ? <img onClick={handleSend} src={assets.send_icon} alt="" /> : null}
                            </div>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleCardSelection("Suggest Some best universities abroad in 1000$ budget.")}>
                                <p>Suggest Some best universities abroad in 1000$ budget.</p>
                            </div>
                            <div className="card" onClick={() => handleCardSelection("Best Universities in USA")}>
                                <p>Best Universities in USA</p>
                            </div>
                            <div className="card" onClick={() => handleCardSelection("Best Country for Study")}>
                                <p>Best Country for Study</p>
                            </div>
                            <div className="card" onClick={() => handleCardSelection("Best Tech related University ")}>
                                <p>Best Tech related University </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='result'>
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src={assets.gemini_icon} alt="" />
                                {loading ? (
                                    <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                ) : (
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                )}
                            </div>
                        </div>
                        <div className="main-bottom">
                            <p className="bottom-info">
                                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                            </p>
                        </div>
                        {/* Display the cards only when the specific prompt is selected */}
                        {selectedCard === "Suggest Some best universities abroad in 1000$ budget." && (
                            <div className="cards">
                                <div className="card" onClick={() => handleCardSelection("Suggest Some best universities abroad in 1000$ budget.")}>
                                    <p>Suggest Some best universities abroad in 1000$ budget.</p>
                                </div>
                                <div className="card" onClick={() => handleCardSelection("Best Universities in USA")}>
                                    <p>Best Universities in USA</p>
                                </div>
                                <div className="card" onClick={() => handleCardSelection("Best Country for Study")}>
                                    <p>Best Country for Study</p>
                                </div>
                                <div className="card" onClick={() => handleCardSelection("Best Tech related University ")}>
                                    <p>Best Tech related University </p>
                                </div>
                            </div>
                        )}
                                           {selectedCard === "Best Universities in USA" && (
                            <div className="cards">
                                <div className="card" onClick={() => handleCardSelection("Suggest Some best universities abroad in 1000$ budget.")}>
                                    <p>Suggest Some best universities abroad in 1000$ budget.</p>
                                </div>
                                <div className="card" onClick={() => handleCardSelection("Best ")}>
                                    <p>Best</p>
                                </div>
                                <div className="card" onClick={() => handleCardSelection("Best Country for Study")}>
                                    <p>Best Country for Study</p>
                                </div>
                                <div className="card" onClick={() => handleCardSelection("Best Tech related University ")}>
                                    <p>Best Tech related University </p>
                                </div>
                            </div>
                        )}

                    </>
                )}
            </div>
        </div>
    );
};

export default Main;
