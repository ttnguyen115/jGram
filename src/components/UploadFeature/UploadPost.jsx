import { Box, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import firebase, { storage, db } from '../../database/firebase';
import PropTypes from 'prop-types';

UploadPost.propTypes = {
    username: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        zIndex: '100',
        height: '50px',

        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    
    uploadBtn: {
        color: 'white',
        border: '1px solid white',
    },

    progress: {
        width: '70%',
    },
    
    input: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },

    files: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

function UploadPost({username}) {
    const classes = useStyles();
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImageUrl(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${imageUrl.name}`).put(imageUrl);
        uploadTask.on(
            "state_changed",
            
            (snapshot) => {
                // progress function
                const tmpProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(tmpProgress);
            },
            
            (err) => {
                // error function
                console.log(err);
                alert(err.message);
            },

            () => {
                // complete function
                storage.ref('images')
                        .child(imageUrl.name)
                        .getDownloadURL()
                        .then(url => {
                            // post image inside db
                            db.collection('posts').add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: username,
                            })

                            setProgress(0);
                            setCaption('');
                            setImageUrl('');
                        })
            }
        );
    };

    return (
        <div className={classes.root}>
            <progress max="100" value={progress} className={classes.progress} />

            <Box className={classes.input}>
                <Box className={classes.files}>
                    <input type="text" placeholder="Enter your caption here..." onChange={e => setCaption(e.target.value)} />
                    <input type="file" onChange={handleChange} />
                </Box>

                <Button className={classes.uploadBtn} onClick={handleUpload}>
                    Upload
                </Button>
            </Box>
        </div>
    );
}

export default UploadPost;