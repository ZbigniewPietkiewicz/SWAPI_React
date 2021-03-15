import { Grid, Typography } from "@material-ui/core";
import React from "react";

export default function Header() {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
                <Typography color='primary' variant='h1'>STAR WARS</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color='primary' variant='h5'>Who is Who?</Typography>
            </Grid>
        </Grid>
    );
  }