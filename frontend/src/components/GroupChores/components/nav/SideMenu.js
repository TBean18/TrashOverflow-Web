import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Grow } from '@material-ui/core'
import colors from '../../utils/color'
import { getImages } from '../../utils/ImageApi'


const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '400px'
    },
    menu: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-around'
    },
    optionContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    box: {
        width: '45%',
        height: '90px',
        backgroundColor: 'black',
        borderRadius: '9px',
        marginBottom: theme.spacing(2)

    },
    colorBox: {
        width: '30%',
        height: '115px',
        backgroundColor: 'black',
        borderRadius: '18px',
        marginBottom: theme.spacing(2)

    }
}))

export default function SideMenu({ setOpenSideMenu, openSideMenu, setBackgroundImage }) {
    const classes = useStyles()
    const [openOptionColor, setOpenOptionColor] = useState(false)
    const [openOptionImage, setOpenOptionImage] = useState(false)
    const [images, setImage] = useState([])

    const getListOfImages = async () => {
        const listOfImages = await getImages()
        console.log(listOfImages)
        setImage(listOfImages)
    }

    useEffect(() => {
        getListOfImages()
    }, [])
    return (
        <div>
            <Drawer 
                open={openSideMenu} 
                anchor='right' 
                onClose={() => { setOpenSideMenu(false) }}
            >
                <div className={classes.drawer}>

                    <div className={classes.menu}>

                        <div className={classes.box}
                            style={{
                                backgroundImage: 'url(https://cdn.neow.in/news/images/uploaded/xpbliss_7.jpg)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            onClick={() => setOpenOptionImage(true)}
                        >
                        </div>

                        <div className={classes.box}
                            style={{
                                backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/300px-64_365_Color_Macro_%285498808099%29.jpg)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                            onClick={() => {
                                setOpenOptionColor(true)
                                setOpenOptionImage(false)
                            }}
                        >
                        </div>
                    </div>

                    {openOptionImage ? (
                        <Grow in={openOptionImage}>
                            <div className={classes.optionContainer}>
                                {images.map((image, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classes.box}
                                            style={{
                                                backgroundImage: `url(${image.thumb})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                            onClick={() => setBackgroundImage(image.full)}
                                        >
                                        </div>
                                    )
                                })}
                            </div>
                        </Grow>
                    ) : (
                        <Grow in={openOptionColor}>
                            <div className={classes.optionContainer}>
                                {colors.map((color, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classes.colorBox}
                                            style={{
                                                backgroundColor: color
                                            }}
                                            onClick={() => setBackgroundImage(color)}
                                        >
                                        </div>
                                    )
                                })}
                            </div>
                        </Grow>
                    )}

                </div>
            </Drawer>
        </div>
    )
}