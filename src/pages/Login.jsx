import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FirebaseContext from '../context/firebase';
import loginPicture from '../assets/images/avatars/iphone-with-profile.jpg';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        margin: '0 auto',
    },

    img: {
        width: '40%',
        maxWidth: '30%',
        borderRadius: '10px',

        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },

    form_container: {
        width: '40%',
        maxWidth: '30%',

        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    
    form: {
        textAlign: 'center',
        padding: '20px',

        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },

        '& > img' : {
            width: '30%',
            textAlign: 'center',
        },

        '& > form' : {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        
        '& > form > input' : {
            margin: '5px 0',
            width: '70%',
            padding: '.5em',
        },

        '& > form > button' : {
            margin: '5px 0',
            width: '75%',
            padding: '.5em',
        },
    },

    crossline: {
        height: '30%',
        borderLeft: '1px solid #7e7e7e',

        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },

    error: {
        color: 'red',
        fontSize: '13px',

    },

    signup: {
        textDecoration: 'none',
        fontSize: '20px',

    },

    logo: {
        width: '200%',
    }
}));

function Login(props) {
    const classes = useStyles();
    const history = useHistory(); 
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [error, setError ] = useState('');
     
    const isInvalid = password === '' || email === ''; 

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = 'Login - jGram';
    }, []);

    return (
        <div className={classes.root}>
            <img className={classes.img} src={loginPicture} alt="ip-social"/>

            <div className={classes.crossline}></div>

            <Box  className={classes.form_container}>
                <Paper elevation={2} className={classes.form}>
                    <img src="../jgramLogo.png" alt="logo-form" className={classes.logo}/>

                    {error && <Typography className={classes.error}>{error}</Typography>}

                    <form onSubmit={handleLogin} method="POST" className={classes.form_detail}> 
                        <input 
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            onChange={({ target }) => setEmail(target.value)}
                        />

                        <input 
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />

                        <button
                            disabled={isInvalid}
                            type="submit"
                        >
                            Log In
                        </button>

                        <hr/>
                    </form>

                    <Box>
                        <Typography>Don't have an account</Typography>
                        <Link to="/signup" className={classes.signup}>
                            Sign Up
                        </Link>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default Login;