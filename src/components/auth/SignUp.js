import { makeStyles, TextField, Typography, Link, Button, Grid, Container, CssBaseline } from '@material-ui/core';
import {useForm} from 'react-hook-form';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

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
}))

const SignUp = () => {
    const {register, handleSubmit} = useForm();
    const {signup} = useContext(AuthContext);
    const onSubmit = (data) => {
        signup(data);
    }
    const classes = useStyles();
    return ( 
        <Container component="main" maxWidth="xs">
        <CssBaseline/>

        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField variant="outlined" inputRef={register({required: true})} margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus/>
                <TextField variant="outlined" inputRef={register({required: true})} margin="normal" type="password" required fullWidth id="password" label="Password" name="password" autoComplete="password" autoFocus/>
                <TextField variant="outlined" inputRef={register({required: true})} margin="normal" type="password" required fullWidth id="repassword" label="Re-enter Password" name="repassword" autoComplete="repassword" autoFocus/>

                
                <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}>Create Account</Button>
                
                <Grid container>
                    <Grid item>
                        <Link href="/app/auth/SignIn" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>

    </Container>
     );
}
 
export default SignUp;