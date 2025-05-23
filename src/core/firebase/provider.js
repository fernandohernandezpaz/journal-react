import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile 
} from 'firebase/auth';
import { fireBaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {

    const result = await signInWithPopup(fireBaseAuth, googleProvider);
  
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { user } = result;
    const { displayName, email, photoURL, uid } = user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const { code: errorCode, message: errorMessage } = error;
    return {
      ok: false,
      errorMessage,
    }
  }
}

export const registerUserWithEmailPassword = async ({
  email, password, displayName
}) => {

  try {

    const result = await createUserWithEmailAndPassword(fireBaseAuth, email, password);

    const { user } = result;
    const { photoURL, uid } = user;

    await updateProfile( fireBaseAuth.currentUser, { displayName });

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };

  } catch (error) {
     const { code: errorCode, message: errorMessage } = error;
    return {
      ok: false,
      errorMessage,
    }
  }
}


export const loginWithEmailPassword = async({ email, password }) => {
  try {

     const result = await signInWithEmailAndPassword(fireBaseAuth, email, password);

    const { user } = result;
    const { photoURL, uid, displayName } = user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };

  } catch(error) {
    const { message:errorMessage } = error;

    return {
      ok: false,
      errorMessage,
    }
  }
}