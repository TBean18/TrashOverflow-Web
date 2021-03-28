import React from 'react'
import '../css/GroupList.css'
import GroupCard from './GroupCard'
import JoIcon from '../images/JoIcon.png'

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
            <GroupCard 
                groupname="Cleveland's Cavaliers"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixelz.cc%2Fwp-content%2Fuploads%2F2017%2F01%2Flebron-james-uhd-4k-wallpaper.jpg&f=1&nofb=1"
            />
            <GroupCard 
                groupname="Castaways"
                image="https://hdqwalls.com/wallpapers/lonely-island-landscape-4k-u5.jpg"
            />
            <GroupCard 
                groupname="Ghosts"
                image="http://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Download-4k-Backgrounds.jpg"
            />
        </div>
    )
}

export default GroupList
