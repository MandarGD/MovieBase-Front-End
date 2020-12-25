import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import './App.css';
import AuthLayout from './components/auth/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import { AuthContext } from './contexts/AuthContext';



function App() {
  const {userData, setUserData, API, setCont} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const validateToken = async () => {
      await Axios.post(`${API}auth/isTokenValid`,null, {headers:{"x-access-token": localStorage.getItem("token")}}).then(result => {
       if(result.data.auth){
        setUserData(result.data.user);
        setLoading(false)
         
       }
       else{
         localStorage.clear();
         setUserData(null);
         setLoading(false);
       }
     })
    }

    if(localStorage.getItem("cont") === "true"){
      console.log(true);
      setCont(localStorage.getItem("cont"))
    }


    if(localStorage.getItem("token")){
      validateToken();
      
    }
    else{
      localStorage.clear();
      setLoading(false);
    }

  },[API, setCont, setUserData]);

  if(loading){
    return (
      <div>LOOOOOOAAAADDDDIINNNNGGGG</div>
    )
  }

  return (
    <div className="App">
      <Route exact path="/">
        {userData? <Redirect to="/app/layout/Home"></Redirect>: <Redirect to="/app/auth"></Redirect>}
      </Route>
      
      <Route path="/app/auth" render={() => (
        userData ? <Redirect to="/app/layout/Home"></Redirect>: <AuthLayout></AuthLayout>
      )}/>

      
      <Route path="/app/layout" render={() => (
        userData? <AppLayout></AppLayout> : <Redirect to="/app/auth"></Redirect>
      )}></Route>
    </div>
  );
}

export default App;
