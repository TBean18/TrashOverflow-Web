import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import '../css/MessageSender.css'
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function MessageSender() {
    const [input, setInput] = useState("")
    const [imgUrl, setImageUrl] = useState("")


    const handleSubmit = e => {
        e.preventDefault();

        // DB stuff

        setInput("");
        setImageUrl("");
    }

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar />
                <form>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className="messageSender__input"
                        placeholder={`Task Name`}
                    />
                    <button onClick={handleSubmit} type="submit">
                        Hidden submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MessageSender
