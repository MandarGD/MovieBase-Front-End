import React, { useContext, useEffect, useState } from 'react';
import {makeStyles, ListItem, Box, Button} from '@material-ui/core';
import {FixedSizeList} from 'react-window';
import Axios from 'axios';
import { AuthContext } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

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

const PeopleList = ({newUser, id}) => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const {API, setUserData} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    

    const unFollow = async(name) => {
        Axios.get(`${API}users/unfollowPerson/${name}`, {headers:{'x-access-token': localStorage.getItem("token")}}).then(result => {
            if(result.data.auth){
                // setUsers(users.splice(users.indexOf(name), 1));
                
                
                let array = users.filter((c) => {
                    return c !== name
                })
                setUsers(array);
                console.log(array);
            }
            else{
                localStorage.clear();
                setUserData(null);
            }
        })
    }

    useEffect(() => {
        const getPeopleFollowed = async() => {
            Axios.get(`${API}users/getFollowedPeople`, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result =>{
                if(result.data.auth){
                    setUsers(result.data.people.peopleFollowed);
                    setLoading(false);
                }
                else{
                    localStorage.clear();
                    setUserData(null);
                    setLoading(false);
                }
            })
        }

        const newPeopleFollowed = async() => {
            Axios.get(`${API}users/getFollowedPeople/${id}`, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result =>{
                if(result.data.auth){
                    setUsers(result.data.people.peopleFollowed);
                    setLoading(false);
                }
                else{
                    localStorage.clear();
                    setUserData(null);
                }
            })
        }
        if(!newUser){
            getPeopleFollowed();
        }
        else{
            newPeopleFollowed();
        }
    }, [API, setUserData, id, newUser])

    if(loading){
        return(
            <div>
                LOOOOAAADDDIIINNNGGG
            </div>
        )
    }

    function renderRow(props){
        const {index, style} = props;
    
        return(
            

            
            <ListItem button style={style} key={index} className={classes.item}>
                <Box borderBottom={1} borderColor="#e6e9f0" className={classes.divide}>
                <Link to={`/app/layout/PersonInfo/${users[index]}`} key={users[index]}>{users[index]}</Link>
                {newUser? "" : <CloseIcon className={classes.icon} onClick={() => unFollow(users[index])}></CloseIcon>}
                
                
                </Box>
                    
            </ListItem>
            
        )
    }


    return ( 
        <div className={classes.root}>
                
                <Box borderBottom={1} borderColor="#e6e9f0">
                    <h1>People Following</h1>
                </Box>
                
                <FixedSizeList height={400} width={300} itemSize={46} itemCount={users.length} >
                    {renderRow}
                        
                </FixedSizeList>

                
            </div>
     );
}
 
export default PeopleList;