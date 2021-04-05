import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, makeStyles, Container, Avatar, Typography, Paper } from '@material-ui/core';

PostFeature.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    
    postContainer: {
        // marginTop: theme.spacing(2),
        justifyContent: 'left',
        
    },
    
    postHeader: {
        alignItems: 'center',
        display: 'flex',
    },

    icon: {
        width: '30px',
        height: '30px',
        fontSize: '1rem',
        marginRight: theme.spacing(1),
    },

    userName: {
        fontWeight: 'bold',
        fontSize: '0.9rem',
    },

    progress: {
        color: '#000',
    },
}));

function PostFeature(props) {
    const classes = useStyles();
    // const [loading, setLoading] = useState(true);

    return (
        <Box className={classes.root}>
            <Container className={classes.container} maxWidth="md" >
                {/* <CircularProgress className={classes.progress} /> */}
                <Paper elevation={2} >
                    <Box className={classes.postContainer}>
                        <Box className={classes.postHeader}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.icon} />
                            <Typography component="body1" className={classes.userName}>Remy Sharp</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default PostFeature;