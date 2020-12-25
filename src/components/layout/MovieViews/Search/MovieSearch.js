import { Button, makeStyles, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    bar: {
        
        width: "75%",
        margin:"5px",
        
        
    },
    container: {
        textAlign: "center"
    }
}))


const MovieSearch = () => {
    const {register, handleSubmit} = useForm();
    const classes = useStyles();
    const history = useHistory();

    const onSubmit = (data) => {
        history.push({
            pathname: '/app/layout/SearchResults',
            search:`?title=${data.title}&genre=${data.genre}&year=${data.year}&minRating=${data.minRating}`,
        })
    }
    return ( 
        <div className = {classes.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Movie Search</h1>
            <TextField id="search-bar" label="Title" variant="outlined" className={classes.bar} name="title" inputRef={register}></TextField>
            <TextField id="search-bar" label="One Genre" variant="outlined" className={classes.bar} name="genre" inputRef={register}></TextField>
            <TextField id="search-bar" label="Year" variant="outlined" className={classes.bar} name="year" inputRef={register}></TextField>
            <TextField id="search-bar" label="Min Rating" variant="outlined" className={classes.bar} name="minRating" inputRef={register}></TextField>
            <br></br>
            <Button variant="contained" color="primary" type='submit'>Search</Button>
            </form>
        </div>
     );
}
 
export default MovieSearch;