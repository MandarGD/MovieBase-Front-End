import React, { useContext } from 'react';
import {TextField, makeStyles, Container, CssBaseline, Typography, Button, Grid, Link} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';

//import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const SignIn = () => {
    const {register, handleSubmit} = useForm();
    const {signin} = useContext(AuthContext);
    
    const onSubmit = (data) =>{
        signin(data);
        
    }
    const classes = useStyles();
    
    return ( 
        <Container component="main" maxWidth="xs">
            <CssBaseline/>

            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField inputRef={register({required: true})} 
                    variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus/>
                    <TextField inputRef={register({required: true})} 
                    variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password" autoComplete="password" autoFocus type="password"/>

                    
                    <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}>Sign In</Button>
                    
                    <Grid container>
                        <Grid item>
                            <Link href="/app/auth/SignUp" variant="body2">
                                {"Don't Have an account? Sign Up here"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>

     );
}
 
export default SignIn;