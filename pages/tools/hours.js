import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Collapse, Container, Fab, Grid, IconButton, List, ListItem, TextField} from "@mui/material";
import {ru} from "date-fns/locale";
import {AddRounded, DeleteRounded} from "@mui/icons-material";

import {TransitionGroup} from 'react-transition-group';

function renderItem({item, handleRemoveFruit, handleChangeStartTime, handleChangeEndTime}) {

    return (

        <ListItem
            key={item.id}
            disableGutters
            secondaryAction={
                <IconButton
                    aria-label="delete"
                    title="Delete"
                    onClick={() => handleRemoveFruit(item)}
                >
                    <DeleteRounded/>
                </IconButton>
            }
        >
            <Grid container spacing={2} columns={{xs: 2}}>
                <Grid item xs={1}>
                    <TimePicker

                        label="Начало смены"
                        value={item.startTime}
                        onChange={(newValue) => {
                            handleChangeStartTime(item, newValue)
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} placeholder={"hh:mm"}/>}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TimePicker
                        label="Окончание смены"
                        value={item.endTime}
                        onChange={(newValue) => {
                            handleChangeEndTime(item, newValue)
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} placeholder={"hh:mm"}/>}
                    />
                </Grid>
            </Grid>
        </ListItem>

    );
}

export default function Hours() {

    const [shifts, setShifts] = useState([]);


    const handleAddShift = () => {
        setShifts((state) => {
            for (var id = 0; id < Number.MAX_VALUE; id++) {
                if (state.find((shift) => shift.id === id) === undefined)
                    break;
            }
            return [
                {id: id, startTime: null, endTime: null, comments: ""},
                ...state
            ]
        });
    };

    const handleRemoveShift = (i) => {
        setShifts((prev) => [...prev.filter((item) => item !== i)]);
    };

    const handleChangeStartTime = (i, value) => {
        setShifts((prev) => [...prev.map((item, index) => {
            if (item.id !== i.id) return item;
            return {...item, startTime: value};
        })]);
    };
    const handleChangeEndTime = (i, value) => {
        setShifts((prev) => [...prev.map((item, index) => {
            if (item.id !== i.id) return item;
            return {...item, endTime: value,};
        })]);
    };

    const addButton = (
        <Fab
            sx={{
                position: 'fixed',
                bottom: 96,
                right: 32,
                zIndex: "9999px"

            }}
            color={"primary"}
            onClick={handleAddShift}
        >
            <AddRounded/>
        </Fab>
    );

    return (
        <div>
            <Container maxWidth={"md"}>
                <Box>
                    {addButton}
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
                        <List>
                            <TransitionGroup>
                                {shifts.map((item) => (
                                    <Collapse key={item.id}>
                                        {renderItem({
                                            item,
                                            handleRemoveFruit: handleRemoveShift,
                                            handleChangeStartTime,
                                            handleChangeEndTime
                                        })}
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                    </LocalizationProvider>
                </Box>
            </Container>
        </div>
    )
        ;
}

