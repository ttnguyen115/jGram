// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     
// };

// export default firebaseConfig;

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD9tl_zR3jilA9vKcMzV6nY6tZi97iLmJg",
    authDomain: "jgram-ad357.firebaseapp.com",
    databaseURL: "https://jgram-ad357-default-rtdb.firebaseio.com",
    projectId: "jgram-ad357",
    storageBucket: "jgram-ad357.appspot.com",
    messagingSenderId: "930672279615",
    appId: "1:930672279615:web:3f52eb9fd3759fc7fc788a",
    measurementId: "G-C50C0WVFHN",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db, auth, storage};