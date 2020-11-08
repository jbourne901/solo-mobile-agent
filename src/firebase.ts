import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAv1019j_AiX30Ptk5BN8FxuR22OfeI4UQ",
    authDomain: "rn-chat-4a626.firebaseapp.com",
    databaseURL: "https://rn-chat-4a626.firebaseio.com",
    projectId: "rn-chat-4a626",
    storageBucket: "rn-chat-4a626.appspot.com",
    messagingSenderId: "965399746769",
    appId: "1:965399746769:web:d7b44a612bde0e14474df0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export {firebaseApp};