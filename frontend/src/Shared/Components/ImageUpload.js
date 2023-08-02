import React, { useRef, useState, useEffect } from 'react';

import styles from './ImageUpload.module.css';

const ImageUpload = (props) => {

    const [ file, setFile ] = useState();
    const [ previewUrl, setPreviewUrl ] = useState();
    const [ isValid, setIsValid ] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [ file ]);

    const pickedImageHandler = (event) => {
        //triggered when file is uploaded.
        // so manage preview image state and pass it to the form so it can be uploaded to the backend
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files || event.target.files.length === 1) {
            pickedFile = event.target.files[ 0 ];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        //utilise the input element without seeing it 
        filePickerRef.current.click();
    };

    return (
        <div className={ styles.parentDiv }>
            <input
                id={ props.id }
                type="file"
                ref={ filePickerRef }
                onChange={ pickedImageHandler }
                style={ { display: 'none' } }
                accept=".jpg, .jpeg, .png"
            />
            <div>
                {
                    previewUrl && props.preview &&(
                        <div className={ styles[ 'image-upload__preview' ] }>
                            <img src={ previewUrl } alt="preview" />
                        </div>
                    )
                }
                <button type="button" onClick={ pickImageHandler }>
                    Pick Image
                </button>
            </div>
            { !isValid && <p>{ props.errorText }</p> }
        </div>
    );
};

export default ImageUpload;