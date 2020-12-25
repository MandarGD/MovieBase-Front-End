import { ListItem, List, makeStyles, Box } from '@material-ui/core';
import React from 'react';
import MovieCard from '../MovieCard';

const useStyles = makeStyles((theme) => ({
    
    item: {
        width:"75%"
    },
    root:{
        width: "75%"
    }
    
}))

const MovieList = ({movies}) => {
    const classes = useStyles();
    return ( 
        

        
        
            <List >
                {movies.map((value) => (
                    
                    <ListItem key={value._id} >
                                    
                        <MovieCard movie={value}></MovieCard>
                                    
                    </ListItem>
                       
                ))}
            </List>
        
        
     );
}
 
export default MovieList;