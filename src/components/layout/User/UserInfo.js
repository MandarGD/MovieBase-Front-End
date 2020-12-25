import { Divider, Grid } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Review from '../ProfileViews/Review';
import PeopleList from '../ProfileViews/User-People-Lists/PeopleList';
import UserList from '../ProfileViews/User-People-Lists/UserList';


const UserInfo = ({match}) => {
    const {API, setUserData} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        const getReviews = async() => {
            Axios.get(`${API}reviews/userReviews/${match.params.id}`, {headers:{"x-access-token": localStorage.getItem("token")}}).then(result => {
                if(result.data.auth){
                    setReviews(result.data.userReviews);
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
    },[API, setUserData, match.params.id])

    return ( 
        <div>
            <h2>{match.params.username}</h2>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <UserList newUser={true} id={match.params.id}></UserList>
                    <PeopleList newUser={true} id={match.params.id}></PeopleList>
                </Grid>
                <Grid item xs={6}>
                    <h2>Reviews</h2>
                    {reviews.map(c => (
                        <div key={c._id}>
                    
                            <Review key={c._id} review={c}></Review>
                            <Divider></Divider>

                        </div>
                    ))}
                    
                </Grid>
            </Grid>
            
            

            
            
        </div>
     );
}
 
export default UserInfo;