import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import PropTypes from 'react';

PostSkeleton.propTypes = {
    num: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 345,
      margin: theme.spacing(2),
    },
    media: {
      height: 190,
    },
}));

function PostSkeleton({num}) {
    const classes = useStyles();

    return (
        <Box>
            {Array.from(new Array(num)).map((x, index) => (
                <Box>
                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </Box>
            ))}
        </Box>
    );
}

export default PostSkeleton;