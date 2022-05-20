import {Box, Container, TextField} from "@mui/material";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
// date-fns
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {useState} from "react";

import ruLocale from 'date-fns/locale/ru';


export default function Home() {
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Container maxWidth="md">
                <Box>
                    <LocalizationProvider locale={ruLocale} dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="Начало смены"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Конец смены"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </Container>
        </div>

    )
}
