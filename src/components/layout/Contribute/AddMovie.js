import { makeStyles, TextField, Button} from '@material-ui/core';
import Axios from 'axios';
import React, { useContext } from 'react';
import {useForm} from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    field: {
        width: "100%"
    },
    button:{
        marginTop: "5px"
    },
    form:{
        margin:'5px'
    },
    textarea:{
        width: '100%',
        marginTop: '5px'
    },
    title: {
        float:"left"
    }
}))

const AddMovie = () => {
    const {register, handleSubmit, errors} = useForm();
    const {setUserData, API} = useContext(AuthContext)
    const classes = useStyles();

    const addMovie = async(data) => {
        Axios.post(`${API}movies/addMovie`, data, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result => {
            if(result.data.auth){
                alert(result.data.message);
            }
            else{
                localStorage.clear();
                setUserData(null);
            }
        })
    }

    
    const onSubmit = (data) => {
        addMovie(data);
    }
    return ( 
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                {errors.title?
                    (<TextField error className={classes.field} id="title" label="Title" name='title' helperText="Enter a title"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="title" label="Title" name='title' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                {errors.genres ?
                    (<TextField error className={classes.field} id="genres" label="Genres" name='genre' helperText="Enter 1 or More Genres"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="genres" label="Genres" name='genre' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                {errors.year?
                    (<TextField error className={classes.field} id="year" label="Year" name='year' helperText="Enter a valid Year"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="year" label="Year" name='year' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                {errors.director?
                    (<TextField error className={classes.field} id="director" label="Director" name='director' helperText="Enter a Director"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="director" label="Director" name='director' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                {errors.actors?
                    (<TextField error className={classes.field} id="actors" label="Actors" name='actors' helperText="Enter 1 or More Actors"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="actors" label="Actors" name='actors' 
                        inputRef={register({
                            required:true
                        })}/>)
                }                

                {errors.writers?
                    (<TextField error className={classes.field} id="writers" label="Writers" name='writers' helperText="Enter 1 or More Writers"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="writers" label="Writers" name='writers' 
                        inputRef={register({
                            required:true
                        })}/>)
                }                
                
                {errors.rating?
                    (<TextField error className={classes.field} id="rating" label="Rating" name='imdbRating' helperText="Enter a Rating"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField  className={classes.field} id="rating" label="Rating" name='imdbRating' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                {errors.poster?
                    (<TextField error className={classes.field} id="poster" label="Poster Link" name='poster' helperText="Enter a valid Year"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="poster" label="Poster" name='poster' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                {errors.runtime?
                    (<TextField error className={classes.field} id="runtime" label="Runtime" name='runtime' helperText="Enter a Runtime"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="runtime" label="Runtime" name='runtime' 
                        inputRef={register({
                            required:true
                        })}/>)
                }
                <label htmlFor="plot" className={classes.title}>Plot</label>
                <br></br>
                <textarea id="plot" name="plot" rows={4} ref={register} defaultValue="Type in a plot" className={classes.textarea}>
                    
                </textarea>

                


                <Button className={classes.button} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </>
     );
}
 
export default AddMovie;