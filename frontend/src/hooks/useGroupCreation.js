import {useState, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState'
const axios = require('axios').default;

export const useGroupCreation = (groupName, groupDescription) => {
    const {storeJWT} = useContext(GlobalContext);

    axios.post('/api/groups/new', {
        group_name: groupName,
        group_description: groupDescription
    })
    .then(res => {
        if(res.data.error !== '') throw res.data.error;
        console.log(res);

        //If the responce contains a refreshed token then save it
        if(res.data.hasOwnProperty('token'))
            storeJWT(res.data.token);
    })
    .catch(err => {
        console.log(err);
    })
}