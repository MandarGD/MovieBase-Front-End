import { Grid, makeStyles } from '@material-ui/core';
import RecMovieCard from './RecMovieCard';
import {Pagination} from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    head: { 
        textAlign: "center"
    }
}))

const RecList = () => {
    const classes = useStyles();
    const {API, setUserData} = useContext(AuthContext);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const recMovies = () => {
            Axios.get(`${API}movies/recMovies`, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result => {
                if(result.data.auth){
                    setMovies(result.data.movies)
                }
                else{
                    localStorage.clear();
                    setUserData(null);
                }
            })
        }

        recMovies();
    }, [API, setUserData])
    return ( 
        <>
            <div>
                <h2 className={classes.head}>Recommended Movies</h2>
            </div>

            

            <Grid container spacing={2} justify="center">
                {movies.map(c => (
                    <Grid item key={c._id}>
                        
                        <RecMovieCard movie={c} key={c._id}></RecMovieCard>

                    </Grid>
                ))}
            </Grid>

            

           
        </>
     );
}
 
export default RecList;

