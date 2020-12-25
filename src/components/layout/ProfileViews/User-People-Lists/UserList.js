import { Box,ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import { AuthContext } from '../../../../contexts/AuthContext';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: "#edf3ff",
        textAlign: "center"
    },
    item: {
        textAlign: "center"
    },
    divide: {
        width: '100%',
        
        maxWidth: 300,
        borderBottomColor: "#e6e9f0"
    },
    icon: {
        verticalAlign: "middle",
        float: "right"
    }
    
}))



const UserList = ({newUser, id}) => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const{API, setUserData } = useContext(AuthContext);
    
    const unfollow = (userid) => {
        Axios.get(`${API}users/unfollowUser/${userid}`, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result => {
            if(result.data.auth){
                let array = users.filter((c) => {
                    return c._id !== userid;
                })
                setUsers(array);

            }
            else{
                localStorage.clear();
                setUserData(null);
            }
        })
    }

    

    useEffect(() => {
        const getFollowed = async() =>{
            Axios.get(`${API}users/getFollowedUsers/`, {headers:{'x-access-token': localStorage.getItem("token")}}).then(result => {
              if(result.data.auth){
                setUsers(result.data.usersFollowed);
    
              }
              else{
                localStorage.clear();
                setUserData(null);
              }
            })
          }
          const getNewFollowed = async() =>{
            Axios.get(`${API}users/getFollowedUsers/${id}`, {headers:{'x-access-token': localStorage.getItem("token")}}).then(result => {
              if(result.data.auth){
                setUsers(result.data.usersFollowed);
    
              }
              else{
                localStorage.clear();
                setUserData(null);
              }
            })
          }
          if(!newUser){
            getFollowed();
          }
          else{
            getNewFollowed();
          }
          
    },[API, setUserData, id, newUser])

    function renderRow(props){
        const {index, style} = props;
    
        return(
            

            
                <ListItem button style={style} key={index} className={classes.item}>
                     <Box borderBottom={1} borderColor="#e6e9f0" className={classes.divide}>
                        <Link to={`/app/layout/UserInfo/${users[index]._id}/${users[index].username}`}>{users[index].username}</Link>
                        <CloseIcon className={classes.icon} onClick={() => unfollow(users[index]._id)}></CloseIcon>
                    </Box>
                    
                </ListItem>
                
                
            
            
            
            
        )
    }
    return ( 
        
            <div className={classes.root}>
                
                <Box borderBottom={1} borderColor="#e6e9f0">
                    <h1>Following</h1>
                </Box>
                
                <FixedSizeList height={400} width={300} itemSize={46} itemCount={users.length} >
                    {renderRow}
                        
                </FixedSizeList>

                
            </div>
        
     );
}
 
export default UserList;