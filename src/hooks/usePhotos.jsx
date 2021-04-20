import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getMyselfPhotos, getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);

    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following } ]= await getUserByUserId(userId); 
            let followedUserPhotos = [];
            let myPhotos = [];
            let totalPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            }

            myPhotos = await getMyselfPhotos(userId);
            totalPhotos = myPhotos.concat(followedUserPhotos);

            totalPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(totalPhotos);
        }

        getTimelinePhotos();
    }, [userId]);

    
    return { photos };
}
