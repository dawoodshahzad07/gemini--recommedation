import React, { useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { useContext } from 'react';

const Main = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [showInitialContent, setShowInitialContent] = useState(true);
    const [scholarshipSelected, setScholarshipSelected] = useState(false);
    const [paidOpportunitiesSelected, setPaidOpportunitiesSelected] = useState(false);

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, handleCardClick } = useContext(Context);

    useEffect(() => {
        if (showResult) {
            setShowInitialContent(false);
        }
    }, [showResult]);
    const handleSend = async () => {
        // Logic to recommend based on selected checkboxes
        if (scholarshipSelected) {
            const scholarshipMessage = `${input} but first provides the  scholarship data for those universities `;
            await onSent(scholarshipMessage);
            setShowInitialContent(true);
        } else if (paidOpportunitiesSelected) {
            // Provide recommendations for paid opportunities
            const paidOpportunitiesSelected = `${input} also provides the  paid Opportunities data for those universities `;
            await onSent(paidOpportunitiesSelected);
            setShowInitialContent(true);
            // Update the chatbot response accordingly
        } else {
            // No specific action required for other cases
            await onSent(input);
            setShowInitialContent(true);
        }
    };
    
    const handleCardSelection = (prompt) => {
        handleCardClick(prompt);
        setSelectedCard(prompt);
        setShowInitialContent(true);
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Aizen</p>
            </div>
            <div className="main-container">
                <div className="greet">
                    <p>
                        <span className="animated-gradient-text ">Hello, Student.</span>
                    </p>
                    <p>Lets's Explore Opportunities!</p>
                </div>
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                    <div>
                        
                         
                        <label>
                            <input type="checkbox" checked={scholarshipSelected} onChange={() => setScholarshipSelected(!scholarshipSelected)} />
                            Scholarship
                        </label>
                        <label>
                            <input type="checkbox" checked={paidOpportunitiesSelected} onChange={() => setPaidOpportunitiesSelected(!paidOpportunitiesSelected)} />
                            Paid Opportunities
                        </label>
                        {input && <img onClick={handleSend} src={assets.send_icon} alt="" />}
                    </div>
                </div>
                {showInitialContent && (
                    <div className="cards">
                        <div className="card" onClick={() => handleCardSelection("Suggest Some best universities abroad in less budget.")}>
                            <p>Suggest Some best universities abroad in less budget.</p>
                        </div>
                        <div className="card" onClick={() => handleCardSelection("Best Universities that  offering computer science programs ")}>
                            <p>Best Universities offering computer science programs </p>
                        </div>
                        <div className="card" onClick={() => handleCardSelection("Best Country for  Study  for free education ")}>
                            <p>Best Country Study for free education </p>
                        </div>
                        <div className="card" onClick={() => handleCardSelection("Best Technology related University in Europe ")}>
                            <p>Best Technology  related University in Europe </p>
                        </div>
                    </div>
                )}  
                {showResult && (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            {/* <img src={assets.gemini_icon} alt="" /> */}
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
                )}
                <div className="main-bottom">
                    <p className="bottom-info">
                        
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;