import { FieldValue, firebase } from '../database/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    const user = result.docs.map(item => ({
        ...item.data(),
        docId: item.id,
    }));

    return user.length > 0 ? user : false;
}

// get user from firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    return user;
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase
        .firestore()
        .collection('users')
        .limit(10)
        .get();

    return result.docs
        .map(user => ({ ...user.data(), docId: user.id }))
        .filter(profile => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id (admin)
    profileId, // the user that admin requests to follow
    isFollowingProfile // true/false (am i currently following this profile?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (admin)
    loggedInUserDocId, // the user that admin requests to follow
    isFollowingProfile // true/false (am i currently following this profile?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export async function getPhotos( userId, following) {
    const result =  await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get();

    const userFollowedPhotos = result.docs.map(photo => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;

            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }

            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];

            return { username, ...photo, userLikedPhoto };
        })
    )

    return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
    const [user] = await getUserByUsername(username);
    
    const result =  await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', user.userId)
        .get();

    return result.docs.map(item => ({
        ...item.data(),
        docId: item.id,
    }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result =  await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUserUsername)
        .where('following', 'array-contains', profileUserId)
        .get();

    const [res = {}] = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))

    return res.userId;
}
