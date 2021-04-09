import React from 'react'
import "../css/Feed.css"
import Post from './Post/Post'


function Feed() {
  return (
    <div className="feed">                 
      <Post 
          message="Right now, when an item is pressed in a menu there is no feedback that it was pressed or scrolled over. It would be awesome to get it so that when highlighting an option in a menu like 'Play Again' or 'Settings' a sound effect would play. Minecraft has something similar to this where a 'click' sound is played when selecting a choice."
          taskTitle="Card-View"
          points={100}
      />
      <Post
        message="I believe we'll need a script to handle what enemies are spawned into each level and where. This script should also ensure that objects do not spawn on top/in each other."
        taskTitle="Group-View"
        points={45}
      />
      <Post
        message="Every zone should have two songs or bits of music that are played between the different rooms. If every zone only has one specific song then it would likely get very tedious to listen to the same clip of music for as long as it takes the player to get through 5 levels. If they die a lot due to the complexity of a zone, they might end up hearing the same bit of music a bunch and that could quickly become aggravating. It would be ideal to have an 'A' track and a 'B' track for every zone.

                Win/Loss music is likely unnecessary."
        taskTitle="Do Dishes"
        points={23}
      />
      {/*image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.destination360.com%2Fnorth-america%2Fus%2Fwashington%2Fseattle%2Fimages%2Fseattle-shopping.jpg&f=1&nofb=1"
            />*/}
      <Post
        message="Deals contact damage. Orbits the hunter while aiming at the player. Occasionally releases itself from the hunter to attack the player."
        taskTitle="Cook Dinner"
        points={82}
      />
      <Post
        message="Deals contact damage. Gets close to the player when the player is aiming away and moves away from the player when they are aiming at it. Occasionally spawns hounds."
        taskTitle="Vacuum"
        points={64}
      />
      {/*image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.destination360.com%2Fnorth-america%2Fus%2Fwashington%2Fseattle%2Fimages%2Fseattle-shopping.jpg&f=1&nofb=1"
            />*/}
      <Post
        message="Deals contact damage. Targets a random direction and moves quickly along a straight path from one side of the screen to the other, rapidly firing bullets behind it, bouncing off the walls."
        taskTitle="Take Out Trash"
        points={79}
      />
    </div>
  );
}

export default Feed;
