import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { getUserPhotosByUsername } from '../../services/firebase';
import Header from './Header';
import Photos from './Photos';

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        email: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
    }),
};

function UserProfile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState); 

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }

        getProfileInfoAndPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.username]);

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    );
}

export default UserProfile;