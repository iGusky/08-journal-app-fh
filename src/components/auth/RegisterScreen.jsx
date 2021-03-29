import React from 'react'
import validator from 'validator'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui);

    const [values, handleInputChange] = useForm({
        name: 'Gustavo',
        email: 'gus@mail.com',
        password: '12345',
        password2: '12345',
    });

    const {name, email, password, password2} = values;

    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName ( email, password, name ) );
        }     
    }

    const isFormValid = () =>{
        
        if(name.trim().length === 0){
            dispatch (setError('Nombre es requerido'));
            return false
        }
        if( !validator.isEmail( email )){
            dispatch( setError('Email es requerido') );
            return false;
        }
        if( (password.length < 6) && (password !== password2) ){
            dispatch( setError('Las contraseñas no coinciden') );
            return false;
        }
        dispatch (removeError());
        return true;
    }

    return (
        <div>
             <h3 className="auth__title">Register Screen</h3>

            <form onSubmit={ handleRegister }>

                { msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                }
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    name="name"
                    className="auth__input"
                    autoComplete = "off"
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input 
                    type="text" 
                    placeholder="Correo" 
                    name="email"
                    className="auth__input"
                    autoComplete = "off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    type="password" 
                    placeholder="Contraseña" 
                    name="password" 
                    className="auth__input"
                    autoComplete = "off"
                    value={ password }
                    onChange={ handleInputChange }
                />
                 <input
                    type="password" 
                    placeholder="Confirme su contraseña" 
                    name="password2" 
                    className="auth__input"
                    autoComplete = "off"
                    value={ password2 }
                    onChange={ handleInputChange }
                />
                <button
                    className="btn btn-primary btn-block" 
                    type="submit"
                >Registrarse</button>

                <Link 
                    to="/auth/login"
                    className="link"    
                >¿Ya está registrado?</Link>

            </form>
        </div>
    )
}
