import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDxjCYlzHGSz9-v_HGo3C7cymp6OJ2ydI0",
    authDomain: "imessage-ec693.firebaseapp.com",
    databaseURL: "https://imessage-ec693.firebaseio.com",
    projectId: "imessage-ec693",
    storageBucket: "imessage-ec693.appspot.com",
    messagingSenderId: "1074222600137",
    appId: "1:1074222600137:web:af46240931dedca7652218",
    measurementId: "G-FGD17YLQKQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db