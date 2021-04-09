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
export default function InputCard({ setOpen, listId }) {
    const classes = useStyle()
    const {addMoreCard} = useContext(storeApi)
    const [cardTitle, setCardTitle] = useState('')
    const handleOnChange = (e) => {
        setCardTitle(e.target.value)
    }
    const handleBtnConfirm = () => {
        addMoreCard(cardTitle, listId)
        setCardTitle('')
        setOpen(false)
    }

    const handleBlur = ()=> {
        setOpen(false)
        setCardTitle('')
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
                        value={cardTitle}
                        placeholder="Enter a title for new card"
                    />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    Add Card
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}
