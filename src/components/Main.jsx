import React, { useContext, useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../assets/assets'
import { Context } from '../context/Context'

const Main = () => {

    const msgEnd = useRef(null);
    const resultContainerRef = useRef(null);

    const {onSent,showResult,loading,resultMessage,resultEnd,setInput,input,messages, isAtBottom, setIsAtBottom} = useContext(Context)

    useEffect(() => {
        renderMarkdown(); // Refreshes the markdown format

        // If the user has NOT scrolled up, auto-scroll
        if (isAtBottom) {
            msgEnd.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, resultMessage]);

    // Detects user scroll position
    const handleScroll = () => {
        if (!resultContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = resultContainerRef.current;
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 30);
    };

    const enterPressed = async (e) => {
        if (e.key === 'Enter') {
            await sendMessage();
            setIsAtBottom(true);
        }
    }

    const sendMessage = async () => {
        if (!loading && resultMessage === resultEnd) {
            await onSent();
            setIsAtBottom(true);
        }
    }

    // Function to handle card clicks
    const handleCardClick = async (text) => {
        await onSent(text);  // Trigger the submission
        setIsAtBottom(true);
    }

    return (
        <div className='main'>
            <div className="main-container">
                {!showResult
                ?
                <>
                    <div className="greet">
                        <p><span>Hello, Welcome to OxfordMUN AI.</span></p>
                        <p>Please pick a conference type.</p>
                    </div>
                    <div className="cards">
                        <div className="general-assemblies">
                            <div className="card-UNEP" onClick={(e) => handleCardClick("UN ENVIRONMENT PROGRAMME")}>
                                <p>UN ENVIRONMENT PROGRAMME</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                            <div className="card-WHO" onClick={(e) => handleCardClick("World Health Organization")}>
                                <p>World Health Organization</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                            <div className="carda-UNDP" onClick={(e) => handleCardClick("UN DEVELOPMENT PROGRAMME")}>
                                <p>UN DEVELOPMENT PROGRAMME</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                            <div className="card-DIS" onClick={(e) => handleCardClick("Disarmament & International Security")}>
                                <p>Disarmament & International Security</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                        </div>
                        <div className="specialized-agencies">
                            <div className="card-african" onClick={(e) => handleCardClick("African Union")}>
                                <p>African Union</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                            <div className="card-economic" onClick={(e) => handleCardClick("Economic and Financial Committee")}>
                                <p>Economic and Financial Committee</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                            <div className="card-uk" onClick={(e) => handleCardClick("UK Parliament")}>
                                <p>UK Parliament</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                            <div className="card-international" onClick={(e) => handleCardClick("International Telecommunication Union")}>
                                <p>International Telecommunication Union</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                        </div>
                        <div className="crisis-committees">
                            <div className="card-KoreanWar" onClick={(e) => handleCardClick("Korean War")}>
                                <p>Korean War (Flagship Committee)</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                            <div className="card-LOTR" onClick={(e) => handleCardClick("Lord of the Rings")}>
                                <p>Lord of the Rings</p>
                                <img src={assets.oxford_icon} alt="" />
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='result' ref={resultContainerRef} onScroll={handleScroll}>
                        {messages.map((message, i) =>
                            <div key={i} className={!message.isBot?"result-user":"result-message"}>
                                <img src={!message.isBot?assets.user_icon:assets.oxford_icon} alt='' />
                                {message.isBot?
                                    <github-md dangerouslySetInnerHTML={{ __html: i === messages.length - 1 ? resultMessage : message.text }}></github-md>
                                    :
                                    <github-md>{message.text}</github-md>
                                }
                            </div>
                        )}
                        <div ref={msgEnd}/>
                    </div>
                    <div className="main-bottom">
                        <div className="search-box">
                            <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={enterPressed} type='text' placeholder='Enter a prompt here'/>
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                <img onClick={()=>sendMessage()} src={assets.send_icon} alt="" />
                            </div>
                        </div>
                        <p className='bottom-info'>
                        OxfordMUN AI might display inaccurate info so double check its response.
                        </p>
                    </div>
                </>
                }

                

                

            </div>
        </div>
    )
}

export default Main