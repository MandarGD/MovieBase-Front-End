import { Card, CardContent, CardMedia, makeStyles, Typography, CardActionArea, } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: theme.spacing(1),
        
    },
    
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    button:{
        marginTop: "auto"
    },
    content: {
        flex: '1 0 auto',
        //height: 250,
        padding: theme.spacing(2)
       
    },
    cover: {
        height:250,
        width: 200,
        margin: theme.spacing(1),
        
    },
   
    card:{
        width: "100%",
        alignItems: "center"
    }
  }));

const MovieCard = ({movie}) => {
    const classes = useStyles();
    const history = useHistory();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        
        let ntotal = 0;
        movie.ratings.forEach(element => {
            ntotal += element;
        });
        if(movie.ratings.length !== 0){
            console.log(ntotal/(movie.ratings.length));
            setTotal(ntotal/(movie.ratings.length));
        }
        
        
        
    },[])
    

    return ( 
        
        <Card className={classes.card}>
            
                <CardActionArea onClick={() => history.push(`/app/layout/MovieInfo/${movie._id}`)}>
                    <div className={classes.root}>

                    
            
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {movie.title}
                        </Typography>
                        <Typography  component="p">
                            {movie.plot}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Runtime: {movie.runtime}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            imdb: {movie.imdbRating}
                            
                        </Typography>

                        

                        {movie.ratings.length === 0? "" : <p>Min Rating: {total}</p>}
                        

                        
                    </CardContent> 

                    <CardMedia
                        className={classes.cover}
                        image={movie.poster}
                        title={movie.poster}
                    />
                    </div>


                    </CardActionArea>
                
                
            
        </Card>
        
        
     );
}

{/* <CardMedia
                
                component="img"
                alt="movie Poster"
                
                height="300"
                image="https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/vice-web.jpg"
                title="movie poster"
            /> */}
 
export default MovieCard;