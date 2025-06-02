import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logOutFireBase } from '../../core/firebase/provider';
import { checkingCredentials, login, logout } from './authSlide';

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch( checkingCredentials () );
    };
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const {ok, errorMessage, ...results} = await signInWithGoogle();

        if (!ok) return dispatch( logout(errorMessage) );

        dispatch( login(results) );
    };
}

export const startUserPasswordLogin = ({ email, password}) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const { ok, errorMessage = '', ...results} = await loginWithEmailPassword({email, password});

        if (!ok) return dispatch( logout({ errorMessage }) );

        dispatch( login(results) );
    };
}

export const startCreatingUserWithEmailPassword = ({
    email, password, displayName
}) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({email, password, displayName});

        const { ok, uid, photoUrl, errorMessage = null } = result;

        if (!ok) return dispatch( logout({errorMessage}) );

        dispatch( login({ uid, displayName, email, photoUrl }) );
    };
}


export const startLogOut = () => {
    return async ( dispatch ) => {

        await logOutFireBase();

        dispatch( logout() );

    };
}
