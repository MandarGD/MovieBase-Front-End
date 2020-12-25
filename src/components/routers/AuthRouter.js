import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

const AuthRouter = () => {
    return ( 
        <>
            <Switch>
                <Route exact path="/app/auth">
                    <Redirect from="/app/auth" to="/app/auth/SignIn"></Redirect>
                </Route>
                <Route exact path="/app/auth/SignIn" component={SignIn}/>
                <Route exact path="/app/auth/SignUp" component={SignUp}/>
               
            </Switch>
        </>
     );
}
 
export default AuthRouter;