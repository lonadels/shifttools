import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {
    Badge,
    Button,
    Collapse,
    Container,
    Divider,
    Fab,
    Grid,
    List,
    ListItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {ru} from "date-fns/locale";
import {AddRounded, DeleteRounded, LightModeRounded, NightsStayRounded, ScheduleRounded,} from "@mui/icons-material";

import Sugar from "sugar";

import {TransitionGroup} from 'react-transition-group';
import {styled} from "@mui/material/styles";
import {addDays, addMinutes, differenceInMinutes} from "date-fns";

function renderItem({item, handleRemoveFruit, handleChangeStartTime, handleChangeEndTime, handleChangeBreaks}) {

    const reg = /^\d+((([.,])\d+)?)$/;

    var correctEndNight = new Date(0, 0, 0, 22) > item.endTime ? addDays(item.endTime, 1) : item.endTime;

    let endAfter22 = differenceInMinutes(correctEndNight, new Date(0, 0, 0, 22));
    let endAfter6 = differenceInMinutes(item.endTime, new Date(0, 0, 0, 6));

    let nightTime = (endAfter22 + endAfter6) / 60;
    let dayTime = endAfter6 / 60;
    let workTime = Number((differenceInMinutes(item.endTime < item.startTime ? addDays(item.endTime, 1) : item.endTime, addMinutes(item.startTime, parseFloat(item.breaks * 30))) / 60).toFixed(2));
    return (
        <Paper variant={"outlined"}>
            <Container sx={{py: 2}}>
                <ListItem
                    key={item.id}
                    disableGutters
                >
                    <Grid container spacing={2} columns={{xs: 2, sm: 3}}>
                        <Grid item xs={1}>
                            <TimePicker
                                label="Начало смены"
                                value={item.startTime}
                                onChange={(newValue) => {
                                    handleChangeStartTime(item, newValue)
                                }}
                                renderInput={(params) => <TextField variant={"standard"} autoComplete={"off"}
                                                                    fullWidth {...params}/>}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <TimePicker
                                label="Конец смены"
                                value={item.endTime}
                                onChange={(newValue) => {
                                    handleChangeEndTime(item, newValue)
                                }}
                                renderInput={(params) => <TextField variant={"standard"} autoComplete={"off"}
                                                                    fullWidth {...params}/>}
                            />
                        </Grid>
                        <Grid item sm={1} xs={2}>
                            <TextField variant={"standard"}
                                       fullWidth
                                       value={item.breaks}
                                       onChange={(e) => {
                                           var newValue = e.target.value;

                                           if (!reg.test(newValue))
                                               e.preventDefault();

                                           handleChangeBreaks(item, e.target.value);
                                       }}
                                       inputProps={{inputMode: 'numeric', pattern: reg}}
                                       label="Перерывы"
                                /*type={"number"}*/
                                       error={!Sugar.String.isEmpty(item.breaks) && !(reg.test(item.breaks))}
                                       autoComplete={"off"}/>
                        </Grid>
                    </Grid>
                </ListItem>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center" sx={{pt: 2}} columns={{xs: 2}}
                      spacing={2}>
                    <Grid item xs alignItems={"center"}>
                        <Grid container
                              direction="row"
                              spacing={1.5}
                              alignItems="center">
                            <Grid item>
                                <Stack direction={"row"}
                                       spacing={0.5}><ScheduleRounded/><Typography>{workTime}</Typography></Stack>
                            </Grid>
                            <Grid item sx={{opacity: 0.5}}>
                                <Stack direction={"row"}
                                       spacing={0.5}><NightsStayRounded/><Typography>{nightTime}</Typography></Stack>
                            </Grid>
                            <Grid item sx={{opacity: 0.5}}>
                                <Stack direction={"row"}
                                       spacing={0.5}><LightModeRounded/><Typography>{dayTime}</Typography></Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={"auto"}>
                        <Button
                            aria-label="delete"
                            variant={"outlined"}
                            size={"large"}
                            color={"error"}
                            onClick={() => handleRemoveFruit(item)}
                        >
                            <DeleteRounded/> Удалить
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        left: 0,
        top: -2,
    },
}));

export default function Hours() {
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState(true);
    const [restrictTime, setRestrictTime] = React.useState(new Date(0, 0, 0, 0));

    const handleClick = () => {
        setOpen(!open);
    };

    const [shifts, setShifts] = useState([]);
    const handleAddShift = () => {
        setShifts((state) => {
            for (var id = 0; id < Number.MAX_VALUE; id++) {
                if (state.find((shift) => shift.id === id) === undefined)
                    break;
            }
            return [
                {id: id, startTime: new Date(0, 0, 0, 0), endTime: new Date(0, 0, 0, 0), breaks: 0, comments: ""},
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
    const handleChangeBreaks = (i, value) => {
        setShifts((prev) => [...prev.map((item, index) => {
            if (item.id !== i.id) return item;
            return {...item, breaks: value, previousBreaks: i.breaks};
        })]);
    };

    const addButton = (
        <Fab
            sx={{
                position: 'fixed',
                bottom: {
                    xs: 82,
                    sm: 96
                },
                right: {
                    xs: 18,
                    sm: 32
                },
            }}
            color={"primary"}
            onClick={handleAddShift}
        >
            <AddRounded/>
        </Fab>
    );

    return (
        <Box sx={{py: 2}}>
            <Container maxWidth={"md"}>
                {addButton}
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
                    <List sx={{
                        '& ul': {padding: 0, paddingBottom: 1},
                    }}>
                        <TransitionGroup>
                            {shifts.map((item) => (
                                <Collapse key={item.id}>
                                    <li key={item.id}>
                                        <ul>
                                            {renderItem({
                                                item,
                                                handleRemoveFruit: handleRemoveShift,
                                                handleChangeStartTime,
                                                handleChangeEndTime,
                                                handleChangeBreaks,
                                            })}
                                        </ul>
                                    </li>
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List>
                    {shifts.length > 0 &&
                        <Divider sx={{mb: 2}}/>}
                    {/*<Paper variant={"outlined"} sx={{mb: 2}}>
                        <ListItemButton onClick={handleClick}>
                            <ListItemText secondary={"Расчет до определенного времени"}>
                                Ограничивать время
                            </ListItemText>
                            <Switch
                                edge="end"
                                checked={open}
                            />
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Container sx={{pb: 2}}>
                                <Collapse in={alert}>
                                    <TimePicker
                                        value={restrictTime}
                                        onChange={(v) => setRestrictTime(v)}
                                        renderInput={(params) => <TextField
                                            variant="standard"
                                            autoComplete={"off"}
                                            helperText="Данная опция позволяет производит расчет показателей до указанного времени"
                                            fullWidth {...params}/>}
                                    />
                                </Collapse>
                            </Container>
                        </Collapse>
                    </Paper>*/}
                    <Paper variant={"outlined"} sx={{mb: 2}}>
                        <Container sx={{py: 4}}>
                            <Grid container
                                  direction="row"
                                  spacing={2}
                                  justifyContent="space-around"
                                  divider={<Divider orientation="vertical" flexItem/>}
                                  alignItems="center">
                                <Grid item>
                                    <Stack direction="column"
                                           justifyContent="center"

                                           alignItems="center">
                                        <Stack direction={"row"}
                                               alignItems="center"
                                               spacing={0.5}>
                                            <ScheduleRounded fontSize={"medium"}/>
                                            <Typography fontSize={"x-large"}>0</Typography>
                                        </Stack>
                                        <Typography fontSize={"small"} color={"text.secondary"}>всего</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item sx={{opacity: 0.5}}>
                                    <Stack direction="column"
                                           justifyContent="center"

                                           alignItems="center">
                                        <Stack direction={"row"}
                                               alignItems="center"
                                               spacing={0.5}>
                                            <NightsStayRounded fontSize={"medium"}/>
                                            <Typography fontSize={"x-large"}>0</Typography>
                                        </Stack>
                                        <Typography fontSize={"small"} color={"text.secondary"}>ночные</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item sx={{opacity: 0.5}}>
                                    <Stack direction="column"
                                           justifyContent="center"

                                           alignItems="center">
                                        <Stack direction={"row"}
                                               alignItems="center"
                                               spacing={0.5}>
                                            <LightModeRounded fontSize={"medium"}/>
                                            <Typography fontSize={"x-large"}>0</Typography>
                                        </Stack>
                                        <Typography fontSize={"small"} color={"text.secondary"}>дневные</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </LocalizationProvider>
            </Container>
        </Box>
    );
}

