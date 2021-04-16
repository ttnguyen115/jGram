import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';  

const config = {
    apiKey: "AIzaSyD9tl_zR3jilA9vKcMzV6nY6tZi97iLmJg",
    authDomain: "jgram-ad357.firebaseapp.com",
    databaseURL: "https://jgram-ad357-default-rtdb.firebaseio.com",
    projectId: "jgram-ad357",
    storageBucket: "jgram-ad357.appspot.com",
    messagingSenderId: "930672279615",
    appId: "1:930672279615:web:7c09270fc111890ffc788a",
    measurementId: "G-6W3Y14NYJN"
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore; // db
const auth = Firebase.auth;
const storage = Firebase.storage;

export { firebase, FieldValue }; 
export { auth, storage};
// export default firebase;