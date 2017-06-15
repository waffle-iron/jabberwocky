var config = {
  apiKey: "AIzaSyCPOA2gBL3mU1HktjOPT5wRReKOaGLyOso",
  authDomain: "jabberwocky-8583d.firebaseapp.com",
  databaseURL: "https://jabberwocky-8583d.firebaseio.com",
  projectId: "jabberwocky-8583d",
  storageBucket: "jabberwocky-8583d.appspot.com",
  messagingSenderId: "867241314701"
};
firebase.initializeApp(config);

let auth = new Auth(firebase.auth());
//let result = auth.createUser('test@example.com', 'password');
auth.signIn('test@example.com', 'password');
//console.log(result);
let database = firebase.database();
let messages = new Messages(database, new Aes);
messages.send('hello');
