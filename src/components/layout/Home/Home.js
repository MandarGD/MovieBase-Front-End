import { Divider, makeStyles} from '@material-ui/core';

import React, { useContext }  from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

import RecList from './RecList';

const useStyles = makeStyles((theme) => ({
    page: {
        float: "right"
    },
    head:{
        textAlign: "center",
        fontSize: "30px",
        marginBottom: "10%"
    }
}))

const Home = () => {
    const classes = useStyles();
    const {userData} = useContext(AuthContext);
    return ( 
        <>
            <div className={classes.head}>
                <h1>Welcome {userData.username}</h1>
                <Divider/>
            </div>

            
            
            
                
            
                
            
            <RecList></RecList>
        </>
     );
}
 
export default Home;