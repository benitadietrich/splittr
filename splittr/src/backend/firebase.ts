import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAqa-_XKddC-X8UEzMemCEqldc3M1g74Ro",
  authDomain: "splittr-pb02.firebaseapp.com",
  projectId: "splittr-pb02",
  storageBucket: "splittr-pb02.appspot.com",
  messagingSenderId: "1002014932798",
  appId: "1:1002014932798:web:005b4fa4e363299b84366f",
};

// Configure
let fb = firebase.initializeApp(firebaseConfig);
let db = fb.firestore();

// AUTH //
export const auth = fb.auth();

export default firebase;

// [START auth_state_listener]
auth.onAuthStateChanged((user: any) => {
  if (user) {
    var uid: any = user.uid;
    localStorage.setItem("uid", uid);
    //  console.log("RES:",auth)
  } else {
    localStorage.removeItem("uid");
  }
});
// [END auth_state_listener]

export { db, fb };
