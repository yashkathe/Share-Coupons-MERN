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
        props.onDeleteCoupon(props.couponId);
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
            setShowCouponModal(false);
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
        } catch(err) {}
    };

    const couponVariant = {
        initial: {
            x: "-5vw",
            opacity: 0
        },
        animate: {
            x: "0",
            opacity: 1,
            transition: { duration: 0 }
        },
        exit: {
            opacity: 0,
            x: "10vw",
            transition: { duration: 2 }
        }
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <AnimatePresence>
                { error &&
                    <Modal paraMessage={ error } onBackdropClick={ clearError } />
                }

                { loadedData && showCouponModal && !isLoading && !error && (
                    <CouponModal
                        onBackdropClick={ closeViewHandler }
                        title={ loadedData.coupon.title }
                        description={ loadedData.coupon.description }
                        company={ loadedData.coupon.company }
                        expirationDate={ loadedData.coupon.expirationDate }
                        creator={ loadedData.coupon.creator.email }
                        addToCart={ addToCartHandler }
                        disableAddToCartBtn={ props.disableAddToCartBtn }
                        disabled={ loadedData.coupon.creator.id === auth.userId ? true : false }
                        isCreatedBySameUser={ loadedData.coupon.creator.id === auth.userId ? true : false }
                        isBoughtBySomeone={ loadedData.coupon.boughtBy === null ? false : true }
                    />) }

                { showDeleteModal &&
                    <Modal
                        headerMessage="Are you sure ?"
                        paraMessage={ props.deleteMessage }
                        showButtons={ true }
                        onCancel={ deleteHandlerfalse }
                        onConfirm={ confirmDeleteHandler }
                        onConfirmMsg="DELETE"
                        onBackdropClick={ deleteHandlerfalse }
                    />
                }
            </AnimatePresence>

            <Card
                className={ styles.card }
                variants={ couponVariant }
                initial="initial"
                animate="animate"
                exit="exit"
            >
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
                    { props.showEditButton && (<Link to={ `/coupon/${props.couponId}` }>EDIT</Link>) }
                    { props.showDeleteButton && (
                        <button
                            className={ styles.deleteBtn }
                            onClick={ deleteHandler }
                            disabled={ !props.disableDelete ? true : false }>
                            DELETE
                        </button>) }
                </div>
            </Card>

        </React.Fragment>
    );
};

export default CouponItem;