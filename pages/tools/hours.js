import * as React from 'react';
import Box from '@mui/material/Box';
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Container, Grid, Stack, TextField} from "@mui/material";
import {ru} from "date-fns/locale";
import {DarkModeRounded, ScheduleRounded, WbSunnyRounded} from "@mui/icons-material";

export default function Hours() {
    const [shiftStarts, setShiftStarts] = React.useState(null);
    const [shiftEnds, setShiftEnds] = React.useState(null);

    return (
        <div>
            <Container maxWidth={"md"}>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
                        <Grid container spacing={2} columns={{xs: 1, sm: 2}}>
                            <Grid item xs={1}>
                                <TimePicker

                                    label="Начало смены"
                                    value={shiftStarts}
                                    onChange={(newValue) => {
                                        setShiftStarts(newValue);
                                    }}
                                    renderInput={(params) => <TextField fullWidth {...params} placeholder={"hh:mm"}/>}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TimePicker
                                    label="Конец смены"
                                    value={shiftEnds}
                                    onChange={(newValue) => {
                                        setShiftEnds(newValue);
                                    }}
                                    renderInput={(params) => <TextField fullWidth {...params} placeholder={"hh:mm"}/>}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TimePicker
                                    label="Считать до"
                                    value={null}
                                    onChange={(newValue) => {
                                    }}
                                    disabled
                                    renderInput={(params) => <TextField
                                        helperText="Для удобства вы можете ограничить время, до которого будут посчитано рабочее время (скоро)"
                                        fullWidth {...params} placeholder={"hh:mm"}/>}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Grid container columns={{xs: 3}} alignContent={"center"} alignItems={"center"}>
                                    <Grid item xs={1} alignItems={"center"} alignContent={"center"} >
                                        <Stack spacing={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                            <WbSunnyRounded/>
                                            <p>0 часов</p>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Stack spacing={1} direction={"row"}>
                                            <DarkModeRounded/>
                                            <p>0 часов</p>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Stack spacing={1} direction={"row"}>
                                            <ScheduleRounded/>
                                            <p>0 часов</p>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </LocalizationProvider>
                </Box>
            </Container>
        </div>
    )
        ;
}

