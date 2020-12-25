
import {Grid, makeStyles , Button, Divider} from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Review from './Review';
import PeopleList from './User-People-Lists/PeopleList';
import UserList from './User-People-Lists/UserList';


const useStyles = makeStyles((theme) => ({
    list:{
        margin: theme.spacing(5)
    },
    root: {
        flexGrow: 1
    },
    button:{
        margin: theme.spacing(1),
        float: "right"
    },
    title:{
        margin: theme.spacing(1)
    },
    header: {
        display: "flex"
    }
}))

const ProfileView = () => {
    const classes = useStyles();
    const{setUserData, cont, setCont, userData, API} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [movieReview, setMovieReview] = useState([]);
    const signout = () => {
        localStorage.clear();
        setUserData(null);
    }
    const upgrade = () =>{
        setCont(!cont);
    }

    useEffect(() => {
        const getReviews = async() => {
            Axios.get(`${API}reviews/userReviews/${userData._id}`, {headers:{"x-access-token": localStorage.getItem("token")}}).then(result => {
                if(result.data.auth){
                    setMovieReview(result.data.userReviews);
                    setLoading(false);
                }
                else{
                    localStorage.clear();
                    setUserData(null);
                    setLoading(false);
                }
                
            })
        }
        getReviews();
    }, [API, setUserData, userData])

    if(loading){
        return(
            <div>
                LOOOOOOOOAAAAAAAAAAADDDDDDDINNGGGG
            </div>
        )
    }

    return ( 
        <>
            

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h1 className={classes.title}>User's Page</h1>
                </Grid>
                <Grid item xs={6}>
                <Button variant="contained" color="secondary" className={classes.button} onClick={signout}>
                    Sign out
                </Button>
                {cont? <Button variant="contained" color="primary" className={classes.button} onClick={upgrade}>
                    DownGrade
                </Button> : <Button variant="contained" color="primary" className={classes.button} onClick={upgrade}>
                    Upgrade
                </Button>}
                

                
                </Grid>
            </Grid>
           

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <UserList newUser={false}></UserList>
                    <PeopleList newUser={false}></PeopleList>
                </Grid>
                <Grid item xs={6}>
                    <h2>Reviews</h2>
                    {movieReview.map(c => (
                        <div key={c._id}>
                        <Review key={c._id} review={c}></Review>
                        <Divider></Divider>
                        </div>
                    ))}
                    
                </Grid>
            </Grid>
            
        </>
     );
}
 
export default ProfileView;