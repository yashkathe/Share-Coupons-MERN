import React, { useState } from 'react';

import FormLabel from "../../Shared/Components/FormLabel";
import ImageUpload from "../../Shared/Components/ImageUpload";

import styles from './Auth.module.css';

const SignupForm = (props) => {

    const [ emailID, setEmailID ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ profileImage, setProfileImage ] = useState(null);

    const emailChangeHandler = (event) => {
        setEmailID(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    };

    const profileImageHandler = (id = '123', pickedFile, fileIsValid) => {
        setProfileImage(pickedFile);
    };

    const submitHandler = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append('email', emailID);
        formData.append('password', password);
        formData.append('image', profileImage);

        props.onSigningUp(formData);
        setEmailID('');
        setPassword('');
        setConfirmPassword('');
        setProfileImage(null);

    };

    return (
        <div className={ styles.form }>
            <form onSubmit={ submitHandler }>
                <FormLabel name="email" label="Email Address" type="email" changeHandler={ emailChangeHandler } value={ emailID } required={ true } />
                <FormLabel name="password" label="Password" type="password" changeHandler={ passwordChangeHandler } value={ password } required={ true } min="8" max="12" />
                <FormLabel name="confirmPassword" label="Confirm Password" type="password" changeHandler={ confirmPasswordChangeHandler } value={ confirmPassword } required={ true } min="8" max="12" />
                <ImageUpload id="image" onInput={ profileImageHandler } preview={ profileImage } />
                <div className={ styles.form_element }>
                    <button type="submit" >SIGN UP</button>
                </div>
            </form>
        </div>

    );
};

export default SignupForm;