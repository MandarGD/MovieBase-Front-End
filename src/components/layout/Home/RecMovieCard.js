import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
        
      },
    media: {
        height: 275,
        width: 250

    },
}))

const RecMovieCard = ({movie}) => {
    const classes = useStyles();
    return (
    
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={movie.poster}
                    title="Movie Poster"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {movie.plot}
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
       

     );
}
 
export default RecMovieCard;