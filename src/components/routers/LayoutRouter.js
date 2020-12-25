import React from 'react';
import MovieView from '../layout/MovieViews/MovieView';
import ProfileView from '../layout/ProfileViews/ProfileView';
import {Route, Switch} from 'react-router-dom';
import ContView from '../layout/Contribute/ContView';
import Home from '../layout/Home/Home';
import MovieInfo from '../layout/MovieViews/MovieInfo/MovieInfo';
import PersonView from '../layout/Person/PersonView';
import MovieReviews from '../layout/MovieViews/MovieReviews';
import UserInfo from '../layout/User/UserInfo';
import SearchResults from '../layout/MovieViews/Search/SearchResults';

const LayoutRouter = () => {
    return ( 
        <>
            <Switch>
                <Route path="/app/layout/Home" exact component={Home}/>
                <Route path="/app/layout/Movies" exact component={MovieView}/>
                <Route path="/app/layout/Profile" exact component={ProfileView}/>
                <Route path='/app/layout/Contribute' exact component={ContView}/>
                <Route path='/app/layout/MovieInfo/:id' exact component={MovieInfo}/>
                <Route path='/app/layout/PersonInfo/:name' exact component={PersonView}/>
                <Route path='/app/layout/Reviews/:title/:id' exact component={MovieReviews}/>
                <Route path='/app/layout/UserInfo/:id/:username' exact component={UserInfo}/>
                <Route path='/app/layout/SearchResults' exact component={SearchResults}/>
                
            </Switch>
            

            
        </>
     );
}
 
export default LayoutRouter;