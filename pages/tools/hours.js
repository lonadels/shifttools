import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {
    Badge,
    Collapse,
    Container,
    Divider,
    Fab, Fade,
    Grid, Grow,
    IconButton,
    List,
    ListItem, ListItemButton, ListItemText,
    Paper,
    Stack, Switch,
    TextField,
    Typography
} from "@mui/material";
import {ru} from "date-fns/locale";
import {
    AddRounded,
    DeleteOutlineOutlined,
    DeleteRounded,
    LightModeRounded,
    NightsStayRounded,
    ScheduleRounded,
} from "@mui/icons-material";

import $ from 'jquery';

import Sugar from "sugar";

import {TransitionGroup} from 'react-transition-group';
import {styled} from "@mui/material/styles";
import {addDays, addMinutes, differenceInMinutes} from "date-fns";
import * as PropTypes from "prop-types";

function renderItem({item, handleRemoveShift, handleChangeStartTime, handleChangeEndTime, handleChangeBreaks}) {

    const reg = /^\d+((([.,])\d+)?)$/;

    return (
        <Paper variant={"outlined"} id={`shift_${item.id}`}>
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
                                       spacing={0.5}><ScheduleRounded/><Typography>{item.workTime(item)}</Typography></Stack>
                            </Grid>
                            <Grid item sx={{opacity: 0.5}}>
                                <Stack direction={"row"}
                                       spacing={0.5}><NightsStayRounded/><Typography>{0}</Typography></Stack>
                            </Grid>
                            <Grid item sx={{opacity: 0.5}}>
                                <Stack direction={"row"}
                                       spacing={0.5}><LightModeRounded/><Typography>{0}</Typography></Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={"auto"}>
                        <IconButton
                            aria-label="delete"
                            variant={"outlined"}
                            size={"large"}
                            color={"error"}
                            onClick={() => handleRemoveShift(item)}
                        >
                            <DeleteOutlineOutlined/>
                        </IconButton>
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

function Summary(props) {
    return <Paper variant={"outlined"} sx={{mb: 2}}>
        <Container sx={{py: 4}}>
            <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  justifyContent="space-evenly"
                  spacing={{xs: 2, sm: 3, md: 4}}
                  alignItems="center">
                <Grid item>
                    <Stack direction="column"
                           justifyContent="center"
                           alignItems="center">
                        <Stack direction={"row"}
                               alignItems="center"
                               spacing={0.5}>
                            <ScheduleRounded fontSize={"medium"}/>
                            <Typography fontSize={"x-large"}>{props.total}</Typography>
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
            </Stack>
        </Container>
    </Paper>;
}

Summary.propTypes = {total: PropTypes.number};
export default function Hours() {
    const [open, setOpen] = React.useState(false);
    const [total, setTotal] = React.useState(0);
    const [alert, setAlert] = React.useState(true);
    const [restrictTime, setRestrictTime] = React.useState(new Date(0, 0, 0, 0));

    const handleClick = () => {
        setOpen(!open);
    };

    const [shifts, setShifts] = useState([]);

    const handleAddShift = () => {
        let id;
        setShifts((state) => {
            for (id = 0; id < Number.MAX_VALUE; id++) {
                if (state.find((shift) => shift.id === id) === undefined)
                    break;
            }
            return [
                ...state,
                {
                    id: id,
                    startTime: new Date(0, 0, 0, 0),
                    endTime: new Date(0, 0, 0, 0),
                    breaks: 0,
                    comments: "",
                    workTime: (item) => {
                        let rawTime = differenceInMinutes(item.endTime < item.startTime ? addDays(item.endTime, 1) : item.endTime, addMinutes(item.startTime, parseFloat(item.breaks * 30))) / 60;
                        return Number(rawTime.toFixed(2));
                        // TODO: refactor this nsfw
                    }
                },

            ]
        });
    };

    useEffect(() => {
        let total = 0;
        shifts.map((item, index) => {
            total += item.workTime(item);
        });
        setTotal(total);
    }, [shifts]);

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
        <Box sx={{py: 2, pt: {xs: 2, sm: 4}}}>
            <Container maxWidth={"md"}>
                {addButton}
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>

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
                </Paper>
                <Divider variant={"middle"} sx={{mb: 2}}/>*/}
                <Summary total={total}/>

                    <Fade in={shifts.length > 0} unmountOnExit><Divider variant={"middle"} sx={{mb: 1}}/></Fade>
                    <List sx={{
                        '& ul': {padding: 0, paddingBottom: 2},
                    }}>
                        <TransitionGroup>
                            {shifts.map((item) => (
                                <Grow key={item.id} onAnimationEnd={() => {
                                    $(`#end`)[0].scrollIntoView({block: "end", behavior: "smooth"});

                                }} timeout={600}>
                                    <li key={`li_${item.id}`}>
                                        <ul>
                                            {renderItem({
                                                item,
                                                handleRemoveShift,
                                                handleChangeStartTime,
                                                handleChangeEndTime,
                                                handleChangeBreaks,
                                            })}
                                        </ul>
                                    </li>
                                </Grow>
                            ))}
                        </TransitionGroup>
                    </List>
                    <Box id={`end`} />

                </LocalizationProvider>
            </Container>

        </Box>
    );
}

