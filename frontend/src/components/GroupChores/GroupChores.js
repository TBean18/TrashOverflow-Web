import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Wrapper from './components/wrapper'
import Navigation from './components/nav/Navigation'

const useStyles = makeStyles((theme) => ({
}))
export default function App() {
    const classes = useStyles()
    const [backgroundImage, setBackgroundImage] = useState('#333333')
    return (
        <div className={classes.root}
            style={{
                backgroundColor: backgroundImage,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Navigation setBackgroundImage={setBackgroundImage} />
            <Wrapper />
        </div>
    )
}