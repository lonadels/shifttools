import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {
    Alert,
    Badge,
    Collapse,
    Container,
    Divider,
    Fab,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField
} from "@mui/material";
import {ru} from "date-fns/locale";
import {
    AddRounded,
    CloseRounded,
    DeleteRounded,
    ErrorRounded,
    ExpandLessRounded,
    ExpandMoreRounded,
    WidgetsRounded
} from "@mui/icons-material";

import {TransitionGroup} from 'react-transition-group';
import {styled} from "@mui/material/styles";

function renderItem({item, handleRemoveFruit, handleChangeStartTime, handleChangeEndTime}) {

    return (
        <Paper variant={"outlined"}>
            <Container sx={{py: 2}}>
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
                    <Grid container spacing={2} columns={{xs: 2, sm: 3}}>
                        <Grid item xs={1}>
                            <TimePicker
                                label="Начало смены"
                                value={item.startTime}
                                onChange={(newValue) => {
                                    handleChangeStartTime(item, newValue)
                                }}
                                renderInput={(params) => <TextField autoComplete={"off"} fullWidth {...params}/>}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <TimePicker
                                label="Конец смены"
                                value={item.endTime}
                                onChange={(newValue) => {
                                    handleChangeEndTime(item, newValue)
                                }}
                                renderInput={(params) => <TextField autoComplete={"off"} fullWidth {...params}/>}
                            />
                        </Grid>
                        <Grid item sm={1} xs={2}>
                            <TextField fullWidth label="Перерывы" type={"number"} autoComplete={"off"}
                                       placeholder={"Число перерывов"}/>
                        </Grid>
                    </Grid>
                </ListItem>
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
                                                handleChangeEndTime
                                            })}
                                        </ul>
                                    </li>
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List>
                    {shifts.length > 0 &&
                        <Divider sx={{mb: 2}}/>}
                    <Paper variant={"outlined"}>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon sx={{minWidth: 40}}>
                                {alert ? <ErrorRounded color={"warning"}/> : <WidgetsRounded/>}
                            </ListItemIcon>
                            <ListItemText>
                                Дополнительно
                            </ListItemText>
                            {open ? <ExpandLessRounded/> : <ExpandMoreRounded/>}
                        </ListItemButton>


                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Container sx={{pb: 2}}>
                                <Collapse in={alert}>
                                    <Alert icon={false}
                                           action={
                                               <IconButton
                                                   aria-label="close"
                                                   color="inherit"
                                                   size="small"
                                                   onClick={() => {
                                                       setAlert(false);
                                                   }}
                                               >
                                                   <CloseRounded fontSize="inherit"/>
                                               </IconButton>
                                           }
                                           severity="warning">Обратите внимание, что
                                        включена функция <b>ограничения расчетов</b>, расчет показателей ограничен
                                        до <b>16:00</b>.</Alert>
                                </Collapse>
                            </Container>
                        </Collapse>
                    </Paper>
                </LocalizationProvider>
            </Container>
        </Box>
    )
        ;
}

