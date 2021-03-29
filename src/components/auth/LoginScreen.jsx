import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);

    const [ values, handleInputChange ] = useForm({
        email: 'gus@mail.com',
        password: '123456'
    });

    const { email, password } = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
    }

    const handleGoogleLogin = () => {
       console.log("clic en boton de google");
       dispatch( startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">Login Screen</h3>

            <form onSubmit={ handleLogin }>
                <input 
                    type="text" 
                    placeholder="Correo" 
                    name="email"
                    className="auth__input"
                    autoComplete = "off"
                    value={ email }
                    onChange={handleInputChange}    
                />
                <input
                    type="password" 
                    placeholder="Contraseña" 
                    name="password" 
                    className="auth__input"
                    autoComplete = "off"
                    value={ password }
                    onChange={handleInputChange}                    
                />

                <button
                    className="btn btn-primary btn-block" 
                    type="submit"
                    disabled={ loading }
                >Ingresar</button>
               
                <div className="auth__social-networks">
                    <p>Otras formas de ingresar</p>
                </div>
                <div 
                    className="google-btn"
                    onClick={ handleGoogleLogin }
                >   
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"    
                >Registrarse</Link>

            </form>
        </>
    )
}
