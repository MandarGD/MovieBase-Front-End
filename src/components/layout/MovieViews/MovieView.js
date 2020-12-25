import { Box, makeStyles } from '@material-ui/core';

import Axios from 'axios';
//import Pagination from '@material-ui/lab/Pagination';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

import MovieList from './MovieListorGrid/MovieList';
import MovieSearch from './Search/MovieSearch';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        //maxWidth: 360,
    },

    page: {
        textAlign: "center"
    },

  
}));

const MovieView = () => {
    const classes = useStyles();
    
    const [movies, setMovies] = useState([]);
    const {setUserData, API} = useContext(AuthContext);
    

    useEffect(() => {
        const fetchMovies = async () =>{
            await Axios.get(`${API}movies/allmovies`, {headers: {"x-access-token": localStorage.getItem("token")}}).then(result => {
                if(result.data.auth){
                    setMovies(result.data.movies);
                    console.log(result.data.movies);
                    
                }
                else{
                    localStorage.clear();
                    setUserData(null);
                    
                }
            })
        }

        if(localStorage.length > 0){
            fetchMovies();
        }

        
    }, [setUserData, API]);

   
    
    return ( 
        <>
            <div className={classes.page}>

            
            
            <MovieSearch></MovieSearch>
    

            <MovieList movies={movies}></MovieList>
            
            <Box display="flex" justifyContent="center" m={1} p={1}>
            
                
                

                
            </Box>

            </div>

            
            
            
        </>
     );
}
 
export default MovieView;

