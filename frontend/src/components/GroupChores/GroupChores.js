import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import './GroupChores.css'
import List from './components/List/List'
import store from './utils/store'
import StoreApi from './utils/storeApi'
function GroupChores() {
    const [data,setData] = useState(store)
    const addMoreCard = (title, listId) => {
        const newCardId = uuid()
        const newCard = {
            id: newCardId,
            title,
        }

        const list = data.lists[listId]
        list.cards = [ ... list.cards, newCard]

        const newState = {
            ... data,
            lists: {
                ... data.lists,
                [listId]: list,
            },
        }

        setData(newState)
    }
    return (
        <StoreApi.Provider value={{ addMoreCard }}>
        <div>
            {data.listIds.map((listID) => {
                const list = data.lists[listID]
                return <List list={list} key={listID} />
            })}
        </div>
        </StoreApi.Provider>
    )
}

export default GroupChores
