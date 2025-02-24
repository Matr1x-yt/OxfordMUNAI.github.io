import React, { useContext, useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../assets/assets'
import { Context } from '../context/Context'

const Main = () => {

    const msgEnd = useRef(null);
    const resultContainerRef = useRef(null);

    const {onSent,showResult,loading,resultMessage,resultEnd,setInput,input,messages, userScrolled, setUserScrolled, isAtBottom, setIsAtBottom} = useContext(Context)

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
                        <p><span>Hello, Welcome to BMUN AI.</span></p>
                        <p>Please pick a conference type.</p>
                    </div>
                    <div className="cards">
                        <div className="cardnato" onClick={(e) => handleCardClick("North Atlantic Treaty Organization (NATO)")}>
                            <p>North Atlantic Treaty Organization (NATO)</p>
                            <img src={assets.berkeley_icon} alt="" />
                        </div>
                        <div className="cardbvc" onClick={(e) => handleCardClick("Berkley Venture Capital (BVC)")}>
                            <p>Berkley Venture Capital (BVC)</p>
                            <img src={assets.berkeley_icon} alt="" />
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='result' ref={resultContainerRef} onScroll={handleScroll}>
                        {messages.map((message, i) =>
                            <div key={i} className={!message.isBot?"result-user":"result-message"}>
                                <img src={!message.isBot?assets.user_icon:assets.berkeley_icon} alt='' />
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
                        BMUN AI might display inaccurate info so double check its response.
                        </p>
                    </div>
                </>
                }

                

                

            </div>
        </div>
    )
}

export default Main