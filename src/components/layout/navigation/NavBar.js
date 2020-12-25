import React, { useContext, useState } from 'react';
import { Tab, Tabs, AppBar} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';




const NavBar = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const {cont} = useContext(AuthContext);
    const history = useHistory();
    

    

    const pages ={
        0:'/app/layout/Home',
        1: '/app/layout/Profile',
        2: '/app/layout/Movies',
        3: '/app/layout/Contribute'
    }

    const handleChange = (event, newValue) => {
        history.push(pages[newValue]);
        setSelectedTab(newValue);
    }

    return ( 
        <AppBar position="static">
            <Tabs value={selectedTab} onChange={handleChange} centered>
                <Tab label="Home" />
                <Tab label="Profile"/>
                <Tab label="Movies"/>
                {cont? <Tab label="Contribute"/> : ""}
                
                
            </Tabs>
        </AppBar>
     );
}
 
export default NavBar;