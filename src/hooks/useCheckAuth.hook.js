import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fireBaseAuth } from '../core/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth/authSlide';


export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch()
      
    useEffect(() => {
        onAuthStateChanged( 
          fireBaseAuth,
          async ( user ) => {
            if (!user) return dispatch( logout() );
            
            const { uid, email, displayName, photoURL } = user;
    
            dispatch( login({ uid, email, displayName, photoURL }) );
          }
         );
    
    }, []);

    return status;
      
}