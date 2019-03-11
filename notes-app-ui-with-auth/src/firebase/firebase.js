import * as firebase from 'firebase';

const config = {
   apiKey: "AIzaSyA611l1qVLNK0NF-DvOlzoZe4zr4_gS2iM",
   authDomain: "notesapp-e932f.firebaseapp.com",
   databaseURL: "https://notesapp-e932f.firebaseio.com",
   projectId: "notesapp-e932f",
   storageBucket: "",
   messagingSenderId: "325951477410"
 };

 firebase.initializeApp(config);

 const googleAuthProvider =new firebase.auth.GoogleAuthProvider();

 export {firebase,googleAuthProvider};