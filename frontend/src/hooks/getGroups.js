import {useState, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState'

export const useGroupRefresh = (context) => {
    const {storeGroups, storeJWT} = useContext(GlobalContext);

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