import {initializeApp} from 'firebase/app'
import{ getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
      } from 'firebase/auth'

import { 
  getFirestore, 
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA0hE8JhE43wr7Ox-3BfFFsNfx1jo6NpsI",
    authDomain: "crwn-clothing-db-ddfeb.firebaseapp.com",
    projectId: "crwn-clothing-db-ddfeb",
    storageBucket: "crwn-clothing-db-ddfeb.appspot.com",
    messagingSenderId: "571525276614",
    appId: "1:571525276614:web:83868228c0da148e47c8c7"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //prompt: "select_account": always select an acc
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"

  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
  
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    // console.log(userDocRef);
    // console.log(userSnapShot);
    console.log(userSnapShot.exists());
    if(!userSnapShot.exists()){
      const {displayName, email} = userAuth;
      const createAt = new Date();
      try{
        await setDoc(userDocRef, 
          {displayName, 
            email, 
            createAt,
            ...additionalInformation
          });
      }
      catch(error){
          console.log(error);
      }
    }
    // if user data does not exist 
    //create / set  tje document with the data from userAuth in my collection
    //if user data exist 
    //return 
    //
   
  };

  export const signInAuthWithEmailAndPassword = async (email, password) => {if(!email|| !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email|| !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  };
