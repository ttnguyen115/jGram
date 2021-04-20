 import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import Skeleton from 'react-loading-skeleton';

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        followers: PropTypes.array,
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
        followers,
        following, 
        username: profileUsername
    } 
}) {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingProfile(isFollowingProfile => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1, 
        });

        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };

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
                    <img className="rounded-full h-40 w-40 flex" src={`/images/avatars/${profileUsername}.jpg`} alt={profileUsername} />
                )}
            </div>

            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>

                    {activeBtnFollow && (
                        <button 
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>

                <div className="container flex mt-4">
                    {!followers || !following ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span>
                                {` `} photos
                            </p>

                            <p className="mr-10">
                                <span className="font-bold">{followerCount}</span>
                                {` `} {followerCount === 1 ? `follower` : `followers`}
                            </p> 
                            <p className="mr-10">
                                <span className="font-bold">{following?.length}</span>
                                {` `} following
                            </p>
                        </>
                    )}
                </div>

                <div className="container mt-4">
                    <div className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName }</div>
                </div>
            </div>
        </div>
    );
}

export default Header;