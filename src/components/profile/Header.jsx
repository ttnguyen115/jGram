import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import { isUserFollowingProfile } from '../../services/firebase';

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
        username: PropTypes.string,
    }).isRequired,
};

function Header({ 
    photosCount, 
    followerCount, 
    setFollowerCount,
    profile: {
        docId: profileDocId, 
        userId: profileUserId, 
        fullName, 
        following, 
        username: profileUsername
    } 
}) {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername;

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        }

        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user?.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                {user.username && (
                    <img className="rounded-full h-40 w-40 flex" src={`/images/avatars/${user.username}.jpg`} alt={user.fullName} />
                )}
            </div>

            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{user.username}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;