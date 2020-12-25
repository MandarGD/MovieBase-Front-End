import React, { useContext } from 'react';
import {useForm} from 'react-hook-form';
import {Button, makeStyles, TextField} from '@material-ui/core';
import Axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
const useStyles = makeStyles((theme) => ({
    field: {
        width: "100%"
    },
    button:{
        marginTop: "5px"
    },
    form:{
        margin:'5px'
    },
    textarea:{
        width: '100%',
        marginTop: '5px'
    }
}))


const AddPerson = () => {
    const {register, handleSubmit, errors} = useForm();
    const classes = useStyles();
    const {API, setUserData} = useContext(AuthContext);
    const addPerson = async(data) => {
        let name = data.fName + " " + data.lName;
        Axios.post(`${API}people/addPerson`, {name: name}, {headers: {'x-access-token': localStorage.getItem('token')}}).then(result => {
            if(result.data.auth){
                alert(result.data.message);
            }
            else{
                alert(result.data.message);
                localStorage.clear();
                setUserData(null);
            }
        })
    }
    
    return ( 
        <>
            <form onSubmit={handleSubmit(addPerson)} className={classes.form}>
                {errors.fName?
                    (<TextField error className={classes.field} id="fName" label="First Name" name='fName' helperText="Enter a Name"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="fName" label="First Name" name='fName' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                {errors.lName?
                    (<TextField error className={classes.field} id="lName" label="Last Name" name='lName' helperText="Enter a Name"
                        inputRef={register({
                            required:true
                        })}/>) : 
                    (<TextField className={classes.field} id="lName" label="Last Name" name='lName' 
                        inputRef={register({
                            required:true
                        })}/>)
                }

                <Button type="submit" variant="contained" color="primary" className={classes.button}>Submit</Button>

            </form>
        </>
     );
}
 
export default AddPerson;