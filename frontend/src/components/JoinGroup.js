import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
const axios = require('axios').default;

export default function JoinGroup() {
    const [isShown, setShown] = useState();
    const [inviteCode, setInviteCode] = useState();
    const {storeJWT, storeGroups } = useContext(GlobalContext)

    function showModal(){
        setShown(true);


    }

    function joinGroup(event){
        event.preventDefault();


        axios.post('/api/groups/join', {
            group_ID: inviteCode
        }).then(res => {
            if(res.data.error !== '') throw res.data.error;
            console.log(res);
            if('token' in res.data) 
                storeJWT(res.data.token)
            storeGroups(res.data.groups)
        })
    }

    function handleTextChange(event){
        event.preventDefault();
        setInviteCode(event.target.value)
    }
    
    
    return (
        <>
            <form onSubmit={joinGroup}>
                <h2>Join Group By Invite Code</h2>
                <label>Invite Code:</label>
                <input type='text' name='inviteCode' onChange={handleTextChange}></input>
                <input type='submit' name='submit'></input>
            </form>
        </>
    )
}
