import { Container, Paper, Avatar, Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [ form, setForm ] = useState(initialState);
    const [ isSignedUp, setIsSignedUp ] = useState(false);

    const [ showPassword, setShowPassword ] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
        setShowPassword(false);
    };

    const handleChange = e => setForm({ ...form, [e.target.name] : e.target.value });
    
    const handleSubmit = e => {
        e.preventDefault();

        if(!isSignedUp){
            dispatch(signin(form, history));
        } else {
            dispatch(signup(form, history));
        }
        
    }

    const renderGoogleFailure = () => console.log('Google Sign In was unsuccessful, try again later.');

    const renderGoogleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>{isSignedUp ? 'Sign up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignedUp && (
                            <React.Fragment>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </React.Fragment>
                        )}
                        <Input name='email' label='Email' handleChange={handleChange} type="email"/>
                        <Input name='password' label='Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} />
                        { isSignedUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignedUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
            clientId="314028582268-281g77vg0e862c5j81qml9ljjcntdo0f.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={renderGoogleSuccess}
            onFailure={renderGoogleFailure}
            cookiePolicy="single_host_origin"
          />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignedUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up!" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;

/*
Setting up GoogleAuth
1. install npm package: GoogleLogin from react-google-login, follow documentation and input the necessary inputs.
2. Since this is from Google Auth we have no need to have an Action Creator to make an api call. Therefore we will create a reducer to manage if there is a user using google auth.
3. On argument 'onSuccess' we want to get what GoogleApi has sent back ('profileObj. & token')
4. dispatch type: AUTH will be both used for our jsonwebtoken and google authorization. 
5. This Auth Reducer will change based on the data and token that we will recieve from this API. 
6. The reducer will save the data in the localStorage and has a token expiry of 1hr. 
7. In the NavBar when the user clicks LogOut they reducer type LOGOUT is called clearing the localStorage and having no data/token saved.
8. The logout helper function in NavBar will setUser to null and will push the user back to the root route.
*/

/* 
Setting up out Local Authorization (jwt)
1. npm install pakage --> jsonwebtoken (back), bcrypt(back) + jwt-decode (front)
BACK:
2. Create a user Model for mongoose/mongodb. So we can have a saved list of Users and their credentials.
3. index.js will use a route called '/user' for access to our API. pass in the arg of userRoutes which is the basic blueprint of our user routes ('signin or signup') in our routes directory.
3. Controllers -> All the logical calls will happen here (signup , signIn). Mostly calls with our database. We encrpt and decrypt passwords. create validation/signIn attempts.
FRONT:
4. This Auth Form serves to see whether the user is is logging in or signing up with our service. (switchMode). Depnding on the swtichMode/isSignUp we will dispatch this Action under signIn or SignUp
5. Actions: makes two post request (signIn/SignUp) to our user API to make a new user or validate an exisiting. 
6. dispatch both actions as auth in order to serve an access token in our reducer. 
7. NavBar consists of local statemanagement of User which determins if there's data or not in our local storage.
8. useEffect if there's a user's access token. we will have to check if the user's token is expired by decoding it and comparing it with the local time. If it is expired use the logout function in the component.
9. Check everytime the the browser's location move or a dispatch has in called.
MIDDLEWARE:
10. In our backend, we need to be able for a logged in User to CRUD when they navigate. 
11. apply auth middleware onto our routing (routes/notes.js).
MIDDLEWARE AUTHORIZATION :
12. FRONT: found under Notes/Note/Note.js checks if the current User is identified to a specific Note then they can render actions like delete/edit. Like is available for anyone that is logged in and tracked
by if a user clicks it will like or unlike.
*/