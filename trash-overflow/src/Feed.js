import React from 'react'
import "./Feed.css"
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'
import JoIcon from './JoIcon.png'

function Feed() {
    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />

            <Post 
                profilePic={JoIcon}
                message="WOW this works!"
                timestamp="This is a timestamp"
                username="jojohnson.jsj"
                image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.destination360.com%2Fnorth-america%2Fus%2Fwashington%2Fseattle%2Fimages%2Fseattle-shopping.jpg&f=1&nofb=1"
            />
            <Post 
                profilePic={JoIcon}
                message="I should do my hw"
                timestamp="This is a timestamp"
                username="jojohnson.jsj"
            />

        </div>
    )
}

export default Feed
