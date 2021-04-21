import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';

function Login(props) {
    const history = useHistory(); 
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [error, setError ] = useState('');
     
    const isInvalid = password === '' || email === ''; 

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = 'Login - jGram';
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5 hidden sm:block">
                <img className="max-w-full" src="/images/iphone-with-profile.jpg" alt="ip-social"/>
            </div>

            <div className="flex flex-col w-full sm:w-2/5 bg-white items-center rounded p-4 border border-gray-primary mb-4">
                <h1 className="flex justify-center w-full">
                    <img src="/images/jgramLogo.png" alt="logo-form" className="mt-2 w-2/4 mb-4 overflow-auto"/>
                </h1>

                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                <form onSubmit={handleLogin} method="POST"> 
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
                        Log In
                    </button>

                    {/* <hr/> */}
                </form>

                <div className="flex justify-center items-center flex-col w-full bg-white rounded p-4 border border-gray-primary">
                    <p className="text-sm">Don't have an account?</p>
                    <Link to={ROUTES.SIGNUP} className="font-bold text-blue-medium">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;