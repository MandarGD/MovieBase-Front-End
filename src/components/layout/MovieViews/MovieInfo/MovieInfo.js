import { Button, Grid, makeStyles, Slider, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, {useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';
import MovieCard from '../MovieCard';

const useStyles = makeStyles((theme) => ({
    slider: {
        width: "75%"
    },
    button: {
        marginRight: "5px"
    },
    textarea: {
        width: "50%"
    },

    poster: {
        width: "300px"
    }
    
}))


const MovieInfo = ({match}) => {
    const {register, handleSubmit} = useForm();
    const {API, setUserData, userData} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [quickReview, setQuickReview] = useState(true);
    const [currentMovie, setCurrentMovie] = useState();
    const [slider, setSlider] = useState(5);
    const [similar, setSimilar] = useState([]);
    const history = useHistory();

    const classes = useStyles();

    const sliderValue = (event, value) => {
        console.log(value);
        setSlider(value);
    }

    

    const genreSearch = (genre) => {
        history.push({
            pathname:"/app/layout/SearchResults",
            search: `?genre=${genre}`
        })
    }
    

    const submitReview = async (data) => {
        

        if(quickReview){
            await Axios.post(`${API}reviews/addReview/${match.params.id}/${currentMovie.title}`, {
                userId: userData._id,
                rating: slider,
                summary: " ",
                body: " ",
            }, {headers: {'x-access-token': localStorage.getItem("token")}})
        }
        else{
            
            if(data.body === "" || data.summary === ""){
                alert("please retract or fill in all of the fields");
            }
            else{
                await Axios.post(`${API}reviews/addReview/${match.params.id}/${currentMovie.title}`, {
                userId: userData._id,
                rating: slider,
                summary: data.summary,
                body: data.body,
            }, {headers:{'x-access-token': localStorage.getItem("token")}})
            }
            
        }
    }

    useEffect(() => {
        const getMovieInfo = async() => {
            Axios.get(`${API}movies/auth/${match.params.id}`, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result => {
                if(result.data.auth){
                    setCurrentMovie(result.data.movie);
                    localStorage.setItem("path", `/app/MovieInfo/${match.params.id}`);
                    setLoading(false);
                }else{
                    localStorage.clear();
                    setUserData(null);
                    setLoading(false);
                }
            })
        }

        const getSimilarMovies = async() => {
            Axios.get(`${API}movies/similarMovies/${match.params.id}`).then(result => {
                setSimilar(result.data);
            })
        }
        getSimilarMovies();
        getMovieInfo();
    }, [API, match.params.id, setUserData])

    if(loading){
        return(
            <div>LOOOOOOOAAAAADDDDDIIIINGGGGG</div>
        )
        
    }

    return ( 
        <Grid container>
            <Grid item xs={6}>
            <h2>{currentMovie.title}</h2>

                <img src={currentMovie.poster} className={classes.poster} id="infoPoster"alt="Poster"></img>

                <br></br>
                {currentMovie.released? <span>Released: {currentMovie.released}</span> : <span>Released: {currentMovie.year}</span>}

                <br></br>
                <span>{currentMovie.rated}</span>
                <br></br>
                <span>Genres: </span>
                <br></br>
                {currentMovie.genre.map((c) => (
                    <Button key={c} onClick={() => genreSearch(c)}>{c}</Button>
                ))}
                <br></br>
                <span>Director:</span>
                <Link to={`/app/layout/PersonInfo/${currentMovie.director}`}> {currentMovie.director}</Link>
                <br></br>
                <span>Written by: </span>
                <br></br>

                {currentMovie.writers.map((c) => (
                <Link to={`/app/layout/PersonInfo/${c}`} key={c}>{c}, </Link>
                ))}
                <br></br>
                <br></br>
                <span>Actors: </span>
                {currentMovie.actors.map((c) => (
                <Link to={`/app/layout/PersonInfo/${c}`} key={c}>{c}, </Link>
                ))}
                <br></br>
                <br></br>
                <span>Plot: </span>
                <br></br>
                <span>{currentMovie.plot}</span>
            </Grid>

            <Grid item xs={6}>
                       


                        {quickReview ?<h4>Quick review</h4> : <h4>Write a Review</h4>}
                        <form onSubmit={handleSubmit(submitReview)}>

                        
                        <Slider
                            defaultValue={5}
                            step={1}
                            marks
                            min={0}
                            max={10}
                            valueLabelDisplay="auto"
                            className={classes.slider}
                            onChange={sliderValue}
                            
                        />


                        {quickReview? "" : (
                            <div>
                                <Typography>
                                    Summary
                                </Typography>
                                <textarea className={classes.textarea} id="summary" rows="5" ref={register} name="summary"></textarea>

                    
                                <Typography>
                                    Review Body
                                </Typography>
                                
                                <textarea className={classes.textarea} id="reviewBody" rows="5" ref={register} name="body"></textarea>
                        
                            </div>)
                        }
                        <br></br>
                        {quickReview? <Button variant="contained" color="primary" className={classes.button} onClick={() => setQuickReview(!quickReview)}>Expand</Button> : <Button variant="contained" color="primary" className={classes.button} onClick={() => setQuickReview(!quickReview)}>Retract</Button>}
                        
                        
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        <br></br>
                        <Link to={`/app/layout/Reviews/${currentMovie.title}/${match.params.id}`}>See User Reviews</Link>
                        </form>


            </Grid>
            <Grid item xs={12}>
                    <h2>Similar Movies by Genre: {currentMovie.genre[0]}</h2>
                {similar.map(c => (
                    <MovieCard movie={c} key={c._id}></MovieCard>
                ))}
            </Grid>


        </Grid>
     );
}
 
export default MovieInfo;