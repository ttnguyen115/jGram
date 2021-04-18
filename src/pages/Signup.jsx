import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import { doesUsernameExist } from '../services/firebase';

function Signup(props) {
    const history = useHistory(); 
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [error, setError ] = useState('');
     
    const isInvalid = password === '' || email === ''; 

    const handleSignUp = async (e) => {
        e.preventDefault();

        const usernameExists = await doesUsernameExist(username);

        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);

                await createdUserResult.user.updateProfile({
                    displayName: username,
                });

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    email: email.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now(),
                });

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName('');
                setEmail('');
                setUsername('');
                setPassword('');
                setError(error.message);
            }

        } else {
            setUsername('');
            setError('This username is already taken!!!');
        };
    };

    useEffect(() => {
        document.title = 'Signup - jGram';
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5 hidden sm:block">
                <img className="max-w-full" src="/images/iphone-with-profile.jpg" alt="ip-social"/>
            </div>

            <div className="flex flex-col w-full sm:w-2/5 bg-white items-center rounded p-4 border border-gray-primary mb-4">
                <h1 className="flex justify-center w-full">
                    <img src="/images/jgramLogo.png" alt="logo-form" className="mt-2 w-6/12 mb-4"/>
                </h1>

                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                <form onSubmit={handleSignUp} method="POST"> 
                    <input 
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Username"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-pray-primary rounded mb-2"
                        onChange={({ target }) => setUsername(target.value)}
                        value={username}
                    />

                    <input 
                        aria-label="Enter your full name"
                        type="text"
                        placeholder="Full name"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-pray-primary rounded mb-2"
                        onChange={({ target }) => setFullName(target.value)}
                        value={fullName}
                    />

                    <input 
                        aria-label="Enter your email address"
                        type="text"
                        placeholder="Email address"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-pray-primary rounded mb-2"
                        onChange={({ target }) => setEmail(target.value)}
                        value={email}
                    />

                    <input 
                        aria-label="Enter your password"
                        type="password"
                        placeholder="Password"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-pray-primary rounded mb-2"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />

                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && `opacity-50`}`}
                    >
                        Sign Up
                    </button>

                    {/* <hr/> */}
                </form>

                <div className="flex justify-center items-center flex-col w-full bg-white rounded p-4 border border-gray-primary">
                    <p className="text-sm">Already have an account?</p>
                    <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;