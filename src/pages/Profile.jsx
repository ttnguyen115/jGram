import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../components/Header';
import UserProfile from '../components/profile';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase';

Profile.propTypes = {
    
};

function Profile(props) {
    const { username } = useParams();
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username);

            if (user?.userId) {
                setUser(user);
            } else {
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, history]);

    

    return user?.username ? (
        <div className="bg-gray-background ">
            <Header />

            <div className="mx-auto max-w-screen-lg pt-20">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;
}

export default Profile;