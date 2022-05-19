import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Avatar, Stack} from "@mui/material";

export default function Profile() {
    return (
        <div>
            <Container maxWidth="md">
                <Box>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Avatar></Avatar> <p>Привет</p>
                    </Stack>
                </Box>
            </Container>

        </div>
    );
}