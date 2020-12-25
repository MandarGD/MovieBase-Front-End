import { Grid, makeStyles, Paper } from '@material-ui/core';
import {React, useState} from 'react';
import {Pagination} from '@material-ui/lab';
import MovieCard from '../MovieCard';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    contain: {
        width: "75%",
        margin: "5px",
        alignItems: "center"
    }
  }));

const MovieGrid = ({movies}) => {
    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();
    return ( 
        <>
            <div className={classes.contain}>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={spacing}>
                    {movies.map((value) => (
                        <Grid key={value._id} item>
                            <MovieCard movie={value}></MovieCard>
                            
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            </Grid>

            <Pagination count={10}></Pagination>
            </div>
        </>
     );
}
 
export default MovieGrid;