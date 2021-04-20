import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function UploadPost(props) {
    const { user } = useContext(UserContext);
    const { firebase } = useContext(FirebaseContext);
    const [imageSrc, setImageSrc] = useState('');
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImageSrc(e.target.files[0]);
        }
    }
    
    const handleUpload = () => {
        const uploadTask = firebase
            .storage()
            .ref(`images/${imageSrc.name}`)
            .put(imageSrc);

        uploadTask.on(
            "state_changed",
            
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            
            (err) => {
                console.log(err);
            },
            // Complete func
            () => {
                firebase
                    .storage()
                    .ref('images')
                    .child(imageSrc.name)
                    .getDownloadURL() 
                    .then(src => {
                        firebase
                            .firestore()
                            .collection('photos')
                            .add({
                                dateCreated: Date.now(),
                                caption: caption,
                                imageSrc: src,
                                username: user.displayName.toLowerCase(),
                                comments: [],
                                likes: [],
                                userId: user.uid,
                                userLatitude: '40.7128°',
                                userLongitude: '74.0060°',
                            })

                        setProgress(0);
                        setCaption('');
                        setImageSrc('');
                    })
            }
        );
    }

    return (
        <div className="flex flex-col pt-20 pb-2 w-3/5 mx-auto">
            <progress className="w-full h-1 rounded" value={progress} max="100" />

            <div className="flex justify-center flex-col">
                <input className="border-2 border-gray-100 border rounded" type="text" placeholder="Enter a caption" value={caption} onChange={e => setCaption(e.target.value)} />
                
                <div className="flex justify-center mt-1">
                    {/* <input type="file" onChange={handleChange} /> */}
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
                    
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleUpload}
                        className="w-1/4 z-1"
                    >
                        Share
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default UploadPost;