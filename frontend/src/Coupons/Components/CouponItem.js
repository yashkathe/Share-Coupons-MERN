import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Card from "../../Shared/UI/Card";
import Modal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import { useHttpClient } from "../../Hooks/useHttpHook";

import styles from "./CouponItem.module.css";

const CouponItem = (props) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const deleteHandler = () => { setShowDeleteModal(true); };
    const deleteHandlerfalse = () => { setShowDeleteModal(false); };

    const confirmDeleteHandler = async () => {
        setShowDeleteModal(false);
        try {
            await sendRequest(`http://localhost:5000/api/coupons/${props.couponId}`, 'DELETE');
            props.onDeleteCoupon(props.couponId);
        } catch(err) { console.log(err); }
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
            { showDeleteModal && <Modal
                headerMessage="Are you sure ?"
                paraMessage="Do you want to proceed and delete this coupon ?"
                showButtons={ true }
                onCancel={ deleteHandlerfalse }
                onConfirm={ confirmDeleteHandler }
                onConfirmMsg="DELETE"
                onBackdropClick={ deleteHandlerfalse } /> }
            <Card className={ styles.card }>
                <div className={ styles.couponItem__code }>
                    <h1> { props.title } !</h1>
                </div>
                <div className={ styles.couponItem__info }>
                    <div>
                        <p>FROM:</p><h4> { props.company }</h4>
                    </div>
                    <div>
                        <p>EXPIRES:</p><h4>   { props.expirationDate }</h4>
                    </div>
                </div>
                <div className={ styles.buttons }>
                    <button onClick={ props.onView } >VIEW</button>
                    { props.showAdminButtons && (<Link to={ `/coupon/${props.couponId}` }>EDIT</Link>) }
                    { props.showAdminButtons && (<button onClick={ deleteHandler }>DELETE</button>) }
                </div>
            </Card>
        </React.Fragment>
    );
};

export default CouponItem;