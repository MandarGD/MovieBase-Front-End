import React, { createContext, useState } from 'react';
import Axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState();
    const [cont, setCont] = useState(false);
    
    

    const API = "/";

    return(
        <AuthContext.Provider value={{
            userData,
            setUserData,
            cont,
            setCont,
            API,
            signin: async(args)=> {
                const {username, password} = args;

                if(localStorage.getItem("token")){
                    await Axios.post(`${API}auth/isTokenValid`, null, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result => {
                        if(result.data.auth){
                            alert("a user has already logged in");
                        }
                        else{
                            localStorage.clear();
                            Axios.post(`${API}auth/login`, {username, password}).then(result => {
                                const {auth, token, user} = result.data;
                                if(auth){
                                    setUserData(user);
                                    localStorage.getItem("token", token);
                                }
                                else{
                                    alert(result.data.message);
                                }
                            })
                        }
                    })
                }
                else{
                    await Axios.post(`${API}auth/login`, {username, password}).then(result => {
                    const {auth, token, user} = result.data;
                    if(auth){
                        setUserData(user);
                        
                        localStorage.setItem("token", token);
                    }else{
                        alert(result.data.message);
                    }
                    
                    })
                }
            },

            signup: async (args) => {
                const {username, password, repassword} = args;

                if(repassword !== password){
                    alert("passwords don't match");
                }
                else{
                    Axios.post(`${API}auth/signup`, {username, password}).then(result => {
                        if(result.data.added){
                            alert("Account successfully created");
                        }
                    })
                }
            }

        }}>
            {children}
        </AuthContext.Provider>
    );
}