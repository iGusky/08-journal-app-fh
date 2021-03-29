import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';

export const startLoginEmailPassword = (email, password) => {
    // Thunk ofrece este dispatch por defecto
    return ( dispatch ) => {

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
                dispatch( finishLoading() )
            })
            .catch( ( err ) => {
                Swal.fire('Error',err.message, 'error');
            })
    }
}
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    }
}
export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}
export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => {
                await user.updateProfile  ({ displayName: name });      
                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch( err => {
                Swal.fire('Error',err.message, 'error');
            }) 
    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})
