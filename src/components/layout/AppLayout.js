import React from 'react';
import LayoutRouter from '../routers/LayoutRouter';
import NavBar from './navigation/NavBar';




const AppLayout = () => {
    
    return ( 
        <>
        <NavBar></NavBar>
        <LayoutRouter></LayoutRouter>
        </>
     );
}
 
export default AppLayout;