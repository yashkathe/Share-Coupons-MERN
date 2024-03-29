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

            setShowCouponModal(true);
            const responseData = await sendRequest(`http://localhost:5000/api/coupons/${props.couponId}`);
            setLoadedData(responseData.coupon);
        } catch(err) {}

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
        },
        animate: {
            x: "0"
        }
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            { error &&
                <Modal paraMessage={ error } onBackdropClick={ clearError } />
            }
            <AnimatePresence>
                { loadedData && showCouponModal && !isLoading && !error && (
                    <CouponModal
                        onBackdropClick={ closeViewHandler }
                        loadedData={loadedData}
                        addToCart={ addToCartHandler }
                        disableAddToCartBtn={ props.disableAddToCartBtn || loadedData.creator.id === auth.userId ? true : false  }
                        isCreatedBySameUser={ loadedData.creator.id === auth.userId ? true : false }
                        isBoughtByUser={ loadedData.boughtBy === auth.userId ? true : false }
                    />) }
            </AnimatePresence>

            <AnimatePresence>
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
            >
                <div className={ styles.couponItem__code }>
                    <h1> { props.title }</h1>
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
                            disabled={ props.disableDelete }>
                            DELETE
                        </button>) }
                </div>
            </Card>

        </React.Fragment>
    );
};

export default CouponItem;