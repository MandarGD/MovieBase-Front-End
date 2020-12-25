import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';
import MovieCard from '../MovieCard';

const SearchResults = () => {
    const [movies, setMovies] = useState([]);
    const {API} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    
    useEffect(() => {
        const getResults = async () => {
            Axios.get(`${API}movies/` + location.search, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result => {
                setMovies(result.data.results)
                setLoading(false);
            })
        }

        getResults();
        //console.log(location.search);
    }, [API])

    if(loading){
        return (
            <div>
                LOOOOAAADDDIIIINNNNGGGG
            </div>
        )
    }
    return ( 
        <>
            <h2>Search Results</h2>


            {movies.map(c => (
                <MovieCard movie={c} key={c._id}></MovieCard>
            ))}

        </>
     );
}
 
export default SearchResults;