import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Card from "../../Shared/UI/Card";
import Modal from "../../Shared/UI/Modal";
import CouponModal from "../../Shared/UI/CouponModal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import { AuthContext } from "../../Shared/Context/auth-context";
import { useHttpClient } from "../../Hooks/useHttpHook";

import styles from "./CouponItem.module.css";

const CouponItem = (props) => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showCouponModal, setShowCouponModal ] = useState(false);
    const [ loadedData, setLoadedData ] = useState();

    const deleteHandler = () => { setShowDeleteModal(true); };
    const deleteHandlerfalse = () => { setShowDeleteModal(false); };

    const confirmDeleteHandler = async () => {
        setShowDeleteModal(false);
        try {
            await sendRequest(`http://localhost:5000/api/coupons/${props.couponId}`,
                'DELETE',
                null,
                {
                    'authorization': 'Bearer ' + auth.token
                });
            props.onDeleteCoupon(props.couponId);
        } catch(err) { console.log(err); }
    };

    const onViewHandler = async () => {
        try {

            const responseData = await sendRequest(`http://localhost:5000/api/coupons/${props.couponId}`);
            setLoadedData(responseData);
            setShowCouponModal(true);

        } catch(err) { console.log(err); }

    };

    const closeViewHandler = () => {
        setShowCouponModal(false);
    };

    const addToCartHandler = async () => {
        try {
            await sendRequest(`http://localhost:5000/api/coupons/cart`,
                'POST',
                JSON.stringify({
                    couponId: props.couponId,
                    userId: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + auth.token
                });
            setShowCouponModal(false);
        } catch(err) { console.log(err); }
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <AnimatePresence>
                { error &&
                    <Modal paraMessage={ error } onBackdropClick={ clearError } />
                }
            </AnimatePresence>

            <AnimatePresence>
                { loadedData && showCouponModal && !isLoading && !error && (<CouponModal
                    onClick={ closeViewHandler }
                    title={ loadedData.coupon.title }
                    description={ loadedData.coupon.description }
                    company={ loadedData.coupon.company }
                    expirationDate={ loadedData.coupon.expirationDate }
                    creator={ loadedData.coupon.creator.email }
                    addToCart={ addToCartHandler }
                    disabled={ loadedData.coupon.creator.id === auth.userId ? true : false }
                    isCreatedBySameUser={ loadedData.coupon.creator.id === auth.userId ? true : false }
                />) }
            </AnimatePresence>

            <AnimatePresence>
                { showDeleteModal &&
                    <Modal
                        headerMessage="Are you sure ?"
                        paraMessage="Do you want to proceed and delete this coupon ?"
                        showButtons={ true }
                        onCancel={ deleteHandlerfalse }
                        onConfirm={ confirmDeleteHandler }
                        onConfirmMsg="DELETE"
                        onBackdropClick={ deleteHandlerfalse }
                    />
                }
            </AnimatePresence>

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
                    <button onClick={ onViewHandler } value={ props.couponId } >VIEW</button>
                    { props.showAdminButtons && (<Link to={ `/coupon/${props.couponId}` }>EDIT</Link>) }
                    { props.showAdminButtons && (<button onClick={ deleteHandler }>DELETE</button>) }
                </div>
            </Card>

        </React.Fragment>
    );
};

export default CouponItem;