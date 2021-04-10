import { Box, Button, Input, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { auth } from '../../database/firebase';
import jgramLogo from '../../jgramLogo.png'

SignUpFeature.propTypes = {};

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {},

    paper: {
        position: 'absolute',
        width: '40%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '5px',
    },

    img: {
        objectFit: 'contain',
        width: '10ch',
        margin: '0 auto',
    },
    
    signup: {
        display: 'flex',
        flexDirection: 'column',
    }

}));

function SignUpFeature(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                })
            })
            .catch(err => alert('Error message: ', err));
    }

    return (
        <Box>
            <div className={classes.paper} style={modalStyle} >
                <center>
                    <form className={classes.signup}>
                        <img className={classes.img} src={jgramLogo} alt="jGram-logo"/>

                        <Input 
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input 
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input 
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button type="submit " onClick={(handleSignup)}>
                            Sign Up
                        </Button>
                    </form>
                </center>
            </div>
        </Box>
    );
};

export default SignUpFeature;