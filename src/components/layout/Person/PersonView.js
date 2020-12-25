import { Button } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import MovieCard from '../MovieViews/MovieCard';

const PersonView = ({match}) => {
    const {setUserData, API} = useContext(AuthContext);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    const follow = async() => {
        await Axios.get(`${API}users/followPerson/${match.params.name}`, {headers:{'x-access-token': localStorage.getItem('token')}})
    }

    useEffect(() => {
        const getWorks = () => {
            Axios.get(`${API}people/getWorks/${match.params.name}`, {headers:{'x-access-token': localStorage.getItem("token")}}).then(result => {
                if(result.data.auth){
                    setWorks(result.data.results);
                    setLoading(false);
                }
                else{
                    localStorage.clear();
                    setUserData(null);
                    setLoading(false);
                }
            })
        }
        getWorks();
    }, [API, setUserData, match])

    if(loading){
        <div>
            LOOOOAAAADDDDIIIINNNNGGGGG
        </div>
    }
    
    return ( 
        <>
            
        <h4>{match.params.name}</h4>
        <Button variant="contained" color="primary" onClick={follow}>Follow</Button>
        <p>Works: </p>
        {works.map(c => (
            <MovieCard key={c._id} movie={c}></MovieCard>
        ))}
    </>
     );
}
 
export default PersonView;