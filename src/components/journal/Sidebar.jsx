import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';


export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogOut = () => {
        dispatch( startLogout() );
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
              <h3 className="mt-5">
                <i className="far fa-moon mr-1"></i>
                <span>{ name }</span>
              </h3>
                <button 
                    className="btn"
                    onClick={ handleLogOut }
                >
                    Cerrar Sesión
              </button>
            </div>
            <div 
                className="journal__new-entry"
                onClick={handleAddNew}    
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-1">
                        Nueva Entrada
                </p>
            </div>
            <JournalEntries />
        </aside>
    )
}
