import { db } from "../firebase/firebaseConfig";
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () =>{
    return async ( dispath, getState ) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );
        dispath ( activateNote( doc.id, newNote ) );

    }
}

export const activateNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes =  ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes ( notes ));
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes,
})

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const noteToFirestroe = {...note};
        if( !note.url ) delete noteToFirestroe.url;
        delete noteToFirestroe.id;
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestroe );

        dispatch( refreshNote(note.id, note) );
        Swal.fire('Guardado', note.title, "success");
    }
}


export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Subiendo...',
            text: 'Por favor espere',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) )

        Swal.close();
    }
}