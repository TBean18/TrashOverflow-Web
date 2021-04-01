import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import GroupItem from "./GroupItem"
const axios = require("axios").default;

export default function GroupList() {
    const {groups, jwt, storeGroups, storeJWT} = useContext(GlobalContext);

    function displayGroups(groups){
        if(!Array.isArray(groups)) return
        return groups.map(group => (<GroupItem group={group} key={group._id}/>))
    }

    function refreshGroups(){
        axios.post('/api/groups/', {
        })
        .then(res => {
            if(res.data.error !== '') throw res.data.error;
            console.log(res);
            storeGroups(res.data.groups);
            if(res.data.hasOwnProperty('token'))
                storeJWT(res.data.token);
            

        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <h2>Groups</h2>
            <button onClick={() => refreshGroups()}>Refresh</button>
            <ul>
               {displayGroups(groups)} 
            </ul>
        </>
    )
}
