import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppbar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch ( startSaveNote( active ));
    }

    const handlePictureUpload = () =>{
        console.log('Picture');
        document.querySelector('#fileSelector').click();
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if( file ){
            dispatch( startUploading( file ) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de enero de 2021</span>

            <input 
                type="file"
                name="file"
                id="fileSelector"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div className="">
                <button className="btn" onClick={ handlePictureUpload }>imagen</button>
                <button className="btn" onClick={ handleSave }>guardar</button>
            </div>
        </div>
    )
}
