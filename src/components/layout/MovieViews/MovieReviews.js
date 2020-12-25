import { Divider } from '@material-ui/core';
import Axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Review from '../ProfileViews/Review';

const MovieReviews = ({match}) => {
    const {API, setUserData} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getReviews = async() => {
            Axios.get(`${API}reviews/getReviews/${match.params.id}`, {headers: {"x-access-token": localStorage.getItem("token")}}).then(result => {
                if(result.data.auth){
                    setReviews(result.data.reviews);
                    
                    setLoading(false);
                }else{
                    localStorage.clear();
                    setUserData(null);
                    setLoading(false);

                }
            })
        }

        getReviews();
    }, [API, match.params.id, setUserData])

    if(loading){
        return(
            <div>
                LOOOOOOOOAAAAAAAAAAADDDDDDDINNGGGG
            </div>
        )
    }

    return ( 
        <div>
            <h2>Movie Reviews</h2>
            {reviews.length === 0? <h4>No Reviews for this movie</h4> :
            reviews.map(c => (
                <div key={c._id}>
                <Review review={c} key={c._id}></Review>
                <Divider></Divider>
                </div>
            ))
            }
        </div>
     );
}
 
export default MovieReviews;