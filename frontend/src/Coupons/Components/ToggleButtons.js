import React from 'react';

import styles from './ToggleButtons.module.css';

const ToggleButtons = (props) => {
    return (
        <div className={ styles.buttons }>
            <button
                disabled={ props.btn1Disabled }
                onClick={ props.btn1OnClick }
                key="btn1"
                >
                Coupons Bought
            </button>
            <button
                disabled={ props.btn2Disabled }
                onClick={ props.btn2OnClick }
                key="btn2"
                >
                Coupons Shared
            </button>
        </div>
    );
};

export default ToggleButtons;