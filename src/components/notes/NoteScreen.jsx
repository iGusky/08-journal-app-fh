import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activateNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppbar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const [ values, handleInputChange,reset ] = useForm( note );
    const { body, title } = values;

    const activeId = useRef( note.id );

    useEffect(() => {
        if( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        }
    }, [ note, reset ]);

    useEffect(( ) => {
        dispatch( activateNote( values.id, { ...values }));
    }, [ values, dispatch ])

    return (
        <div className="notes__main-content">
            <NotesAppbar />

            <div className="notes__content">
        
                <input 
                    type="text"
                    placeholder="Un brillate titulo"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title" 
                    id="title" 
                    value={ title }
                    onChange={ handleInputChange }
                />
                <textarea 
                    placeholder="¿Que tienes para contar?"
                    className="notes__textarea"
                    value={ body }
                    name="body" 
                    id="body" 
                    cols="30" 
                    rows="10"
                    onChange={ handleInputChange }
                    >    
                </textarea>

                { 
                    note.url &&
                        (
                            <div className="notes__images">
                                <img 
                                    src={ note.url }
                                    alt="fotografia del tema"
                                />
                            </div>
                        )
                }
            </div>
        </div>
    )
}
