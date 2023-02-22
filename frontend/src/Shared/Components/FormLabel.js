import React from 'react';

import styles from './FormLabels.module.css';

const FormLabel = (props) => {
    return (
        <div className={ styles.form_element }>
            <label >{ props.label }</label>
            <input
                onFocus={ props.focusHandler }
                onBlur={props.blurHandler}
                type={ props.type }
                onChange={ props.changeHandler }
                value={ props.value }
                maxLength={ props.max }
                minLength={ props.min }
                required={ props.required }
            />
        </div>
    );
};

export default FormLabel;