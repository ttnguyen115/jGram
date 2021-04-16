import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FirebaseContext from '../context/firebase';
import loginPicture from '../assets/images/avatars/iphone-with-profile.jpg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    img: {
        width: '30%',
        maxWidth: '50%',
        // border: '1px solid #cecece',
        borderRadius: '10px',
    },

    form_container: {
        width: '35%',
    },

    form: {
        textAlign: 'center',
        padding: '20px',

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
            padding: '15px',
        },

        '& > form > button' : {
            margin: '5px 0',
            width: '75%',
            padding: '15px',
        },
    },

    crossline: {
        height: '30%',
        borderLeft: '1px solid #7e7e7e'
    },
}));

function Login(props) {
    const classes = useStyles();
    const history = useHistory(); 
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [error, setError ] = useState('');
     
    const isInvalid = password === '' || email === ''; 

    const handleLogin = () => {
        
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
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
                    <img src="../jgramLogo.png" alt="logo-form"/>

                    {error && <Typography>{error}</Typography>}

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
                            onClick={handleSubmitClick}
                        >
                            Log In
                        </button>

                        <hr/>
                    </form>

                    <Box>
                        <Typography>Don't have an account</Typography>
                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default Login;