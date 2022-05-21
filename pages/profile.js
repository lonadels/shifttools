import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {AutoFixHighRounded, DarkModeRounded, LightModeRounded} from "@mui/icons-material";

export default function Profile() {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div>
            <Container maxWidth="md">
                <Box>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="light"><LightModeRounded/></ToggleButton>
                        <ToggleButton value="dark"><DarkModeRounded/></ToggleButton>
                        <ToggleButton value="system"><AutoFixHighRounded/></ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Container>

        </div>
    );
}