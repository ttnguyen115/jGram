import React, { useContext } from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import UploadPost from './upload';

function Header(props) {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8 fixed w-full">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer w-2/12 sm:w-1/12">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="jGram Logo"> 
                                <img src="/images/jgramLogo.png" alt="logo-jgram" className=""/>
                            </Link>
                        </h1>
                    </div>

                    <div className="text-gray-700 text-center flex items-center align-items w-60 justify-evenly">
                        { user ? (
                            <>
                                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <HomeIcon />
                                </Link>

                                {/* <AddCircleOutlineIcon /> */}
                                <UploadPost user={user} />

                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={() => firebase.auth().signOut()}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            firebase.auth().signOut();
                                        }
                                    }}
                                >
                                    <ExitToAppIcon />
                                </button>

                                <div className="flex items-center cursor-pointer">
                                    <Link to={`/p/${user.displayName}`}>
                                        <img className="rounded-full h-8 w-8 flex" src={`/images/avatars/${user.displayName}.jpg`} alt={`${user.displayName} profile`} />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN} >
                                    <button type="button" className="bg-blue-medium font-bold text-sm w-20 h-8 rounded text-white">
                                        Log In
                                    </button>
                                </Link>
                                
                                <Link to={ROUTES.SIGNUP} >
                                    <button type="button" className="font-bold text-sm rounded text-blue-medium w-20 h-8">
                                        Sign Up 
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;