import React, { useState } from 'react'
import './AddCardFront.css'


function AddCardFront() {
    const [input, setInput] = useState("");
    const [imgUrl, setImageUrl] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        // DB stuff

        setInput("");
        setImageUrl("");
    }

    return (
        <div className="addCardFront">
            <form onSubmit="">
                <div className="addCardFront__groupName">
                    <input type="text" placeholder="Group Name"/>  
                </div>
                <div className="addCardFront__groupDescription">
                    <textarea type="text" rows="5" placeholder="Description"/>  
                </div>
                <button className="hiddenSubmit" onClick={handleSubmit} type="submit">
                    Hidden submit
                </button>
            </form>  
        </div>
    )
}

export default AddCardFront
