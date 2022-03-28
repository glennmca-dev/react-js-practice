import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp =  firebase.initializeApp({
    apiKey: "AIzaSyBoSKPMNm_IGk3vQEpSZ5xBJZOjYCJRJF8",

    authDomain: "catch-of-the-day-glenn.firebaseapp.com",

    databaseURL: "https://catch-of-the-day-glenn-default-rtdb.europe-west1.firebasedatabase.app"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;