import { Button } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const Review = ({review}) => {
    const {API, userData, setUserData} = useContext(AuthContext);
    const [username, setUsername] = useState("");

    const follow = async() => {
        await Axios.get(`${API}users/followUser/${review.user}`, {headers:{"x-access-token": localStorage.getItem("token")}}).then(result => {
            if(result.data.auth){
                alert(result.data.message);
            }
            else{
                localStorage.clear();
                setUserData(null);
            }
        })
    }
    
    useEffect(() => {
        const getUsername = async() => {
            await Axios.get(`${API}users/getUserName/${review.user}`).then(result => {
                setUsername(result.data.username);
            })
        }

        getUsername();
    },[API, review.user])
    return ( 
        <div>
            <p>by {username}</p>
            {userData.username === username ? "": <Button variant="contained" color="primary" onClick={follow}>Follow</Button>}
            <h4>Movie: {review.title}</h4>
            
            <p>{review.rating} / 10</p>
            {review.summary !== " " && review.body !==" "? <div><p>Summary: {review.summary}</p>
            <p>Body: {review.body}</p> </div>:"" }
            
        </div>
     );
}
 
export default Review;