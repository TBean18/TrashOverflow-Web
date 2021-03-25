import React from 'react'
import './GroupList.css'
import GroupCard from './GroupCard'
import JoIcon from './JoIcon.png'

function GroupList() {
    return (
        <div className="groupList">
            <GroupCard 
                profilePic={JoIcon}
                message="WOW this works!"
                timestamp="This is a timestamp"
                groupname="Trash Overflow"
                image="https://www.hdwallpapers.in/download/skyscrapers_panorama_city_lights_4k_hd-HD.jpg"
            />
            <GroupCard 
                groupname="Busch Gardens Stans"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F03%2FGiraffe-Wallpaper-for-Computer.jpg&f=1&nofb=1"
            />
            <GroupCard 
                groupname="Geralt's Gang"
                image="https://cdn.wallpapersafari.com/38/17/14cmY8.jpg"
            />
        </div>
    )
}

export default GroupList
