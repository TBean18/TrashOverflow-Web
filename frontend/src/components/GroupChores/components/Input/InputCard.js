import { Button, IconButton, InputBase, Paper } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { fade, makeStyles } from '@material-ui/core/styles'
import storeApi from '../../utils/storeApi'


const useStyle = makeStyles((theme) => ({
    card: {
        paddingBottom: theme.spacing(4),
        margin: theme.spacing(0, 1, 1, 1),
    },
    input: {
        margin: theme.spacing(1),
    },
    btnConfirm: {
        background: '#5AAC44',
        color: '#fff',
        "&:hover": {
            background: fade("#5AAC44", 0.5),
        }
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    }
}))
export default function InputCard({ setOpen, listId, type }) {
    const classes = useStyle()
    const { addMoreCard, addMoreList } = useContext(storeApi)
    const [title, setTitle] = useState('')

    const handleOnChange = (e) => {
        setTitle(e.target.value)
    }
    const handleBtnConfirm = () => {
        if (type == 'card') {
            addMoreCard(title, listId)
            setTitle('')
            setOpen(false)
        }
        else {
            addMoreList(title)
            setTitle('')
            setOpen(false)
        }
    }

    const handleBlur = ()=> {
        setOpen(false)
        //setTitle('')
    }

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase
                        onChange={handleOnChange}
                        multiline
                        onBlur ={handleBlur}
                        fullWidth
                        inputProps={{
                            className: classes.input
                        }}
                        value={title}
                        placeholder={
                            type == 'card'
                                ? "Enter card title"
                                : "Enter list title"
                        }
                    />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    {type == 'card' ? "Add Card" : "Add List"}
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}
