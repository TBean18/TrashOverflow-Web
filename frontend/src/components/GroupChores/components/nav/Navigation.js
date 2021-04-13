import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TopBar from './TopBar'
import SideMenu from './SideMenu'


const useStyles = makeStyles((theme) => ({

}))

export default function Navigation({ setBackgroundImage }) {
    const [openSideMenu, setOpenSideMenu] = useState(false)
    return (
        <div>
            <TopBar setOpenSideMenu={setOpenSideMenu}/>
            <SideMenu 
                openSideMenu={openSideMenu} 
                setOpenSideMenu={setOpenSideMenu} 
                setBackgroundImage={setBackgroundImage}
            />
        </div>
    )
}