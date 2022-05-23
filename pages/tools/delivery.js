import * as React from 'react';
import Box from '@mui/material/Box';
import {Divider, Grid} from "@mui/material";

export default function Delivery() {
    const content = (
        <div>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
        </div>
    );

    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item xs>
                        {content}
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs>
                        {content}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

