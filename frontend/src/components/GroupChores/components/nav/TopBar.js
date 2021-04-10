import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    AppBar:{
        background: "None"
    },
    title: {
        flexGrow: 1,
    },
    btn: {
        color: '#fff',
        backgroundColor: '#000',
    }
}))

export default function TopBar({ setOpenSideMenu }) {
    const classes = useStyles()
    return (
        <div>
            <AppBar position="static" className={classes.AppBar} elevation={0}>
                    <Toolbar>
                    <h1 className={classes.title}>Daily Todo</h1>
                        <Button 
                            className={classes.btn} 
                            onClick={() => setOpenSideMenu(true)}
                        >
                            Change Background
                        </Button>
                    </Toolbar>
            </AppBar>
        </div>
    )
}
