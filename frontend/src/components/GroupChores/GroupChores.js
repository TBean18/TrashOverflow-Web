import React, { useState } from 'react'
import './GroupChores.css'
import List from './components/List/List'
import store from './utils/store'

function GroupChores() {
    const [data,setData] = useState(store)
    return (
        <div>
            {data.listIds.map((listID) => {
                const list = data.lists[listID]
                return <List list={list} key={listID} />
            })}
        </div>
    )
}

export default GroupChores
