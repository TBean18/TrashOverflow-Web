import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import GroupItem from "./GroupItem"

export default function GroupList() {
    const {groups} = useContext(GlobalContext);

    function displayGroups(groups){
        if(!Array.isArray(groups)) return
        return groups.map(group => (<GroupItem group={group}/>))
    }
    return (
        <>
            <h2>Groups</h2>
            <button>Refresh</button>
            <ul>
               {displayGroups(groups)} 
            </ul>
        </>
    )
}
