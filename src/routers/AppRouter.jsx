import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect,  Switch } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebaseConfig'
import { useDispatch } from "react-redux";
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import {  startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState( true );
    const [isLoggedIn, setIsLoggedIn] = useState( false );

    // Observable que está al pendiente de los cambios en el usuario.
    useEffect(() => {
        firebase.auth().onAuthStateChanged( ( user ) => { 
            
            if ( user?.uid ){
                dispatch( login( user.uid, user.displayName) );
                setIsLoggedIn( true );

                dispatch ( startLoadingNotes( user.uid ) );
            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );
        } );
    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if( checking ){
        return(
            <div className="lds-ring main"><div></div><div></div><div></div><div></div></div>
        )
    }



    return (
        <Router>
            <Switch>
                    <PublicRoute
                        isAuthenticated = { isLoggedIn }
                        path = "/auth"
                        component = { AuthRouter }
                    />
                    <PrivateRoute   
                        exact
                        isAuthenticated = { isLoggedIn }
                        path = "/"
                        component = { JournalScreen }
                    />
                    <Redirect to = "/auth/login"/>     
            </Switch>
        </Router>
    )
}
