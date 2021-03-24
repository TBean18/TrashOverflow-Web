import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
const axios = require('axios').default;

export default function JoinGroup() {
    const {isShown, setShown} = useState();
    const {storeJWT, storeGroups } = useContext(GlobalContext)

    function showModal(){
        setShown(true);


    }

    function joinGroup(inviteCode){
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
    
    return (
        <>
            <form onSubmit={() => joinGroup()}>
                <h2>Join Group By Invite Code</h2>
                <label>Invite Code:</label>
                <input type='text' name='inviteCode'></input>
                <input type='submit' name='submit'></input>
            </form>
        </>
    )
}
