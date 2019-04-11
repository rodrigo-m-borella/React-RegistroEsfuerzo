import * as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyD7zFjzPAv1z06W0UwwWWq9ri2Y_okrgl4",
    authDomain: "entrega-final-db.firebaseapp.com",
    databaseURL: "https://entrega-final-db.firebaseio.com",
    projectId: "entrega-final-db",
    storageBucket: "entrega-final-db.appspot.com",
    messagingSenderId: "297931609343"
  };
  firebase.initializeApp(config);

export default firebase;