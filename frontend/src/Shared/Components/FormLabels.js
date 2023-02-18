import React from 'react';

import styles from './FormLabels.module.css';

const FormLabels = (props) => {
    return (
        <div className={ styles.formLabel }>
            <div>
                <label htmlFor={ props.id } >{ props.label }</label>
            </div>
            <div>
                <input type={ props.type } onChange={ props.changeHandler } value={ props.value } />
            </div>
        </div>
    );
};

export default FormLabels;