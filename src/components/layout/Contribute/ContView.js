import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import AddMovie from './AddMovie';
import AddPerson from './AddPerson';

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign:"center"
    }
}))

const ContView = () => {
    const classes = useStyles();
    return ( 
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={6}>
                <h2>Add a Movie</h2>
                <AddMovie/>
            </Grid>
            <Grid item xs={6}>
                <h2>Add a Person</h2>
                <AddPerson/>
            </Grid>
        </Grid>
     );
}
 
export default ContView;