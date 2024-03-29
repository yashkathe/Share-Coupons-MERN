import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Card from "../../Shared/UI/Card";
import AddCouponForm from "../Components/AddCouponForm";
import ErrorModal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import { useHttpClient } from "../../Hooks/useHttpHook";
import { AuthContext } from "../../Shared/Context/auth-context";

import styles from './AddCoupons.module.css';

const AddCoupons = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const history = useHistory();

    const createCoupon = async (newCoupon) => {
        try {
            await sendRequest(
                "http://localhost:5000/api/coupons",
                'POST',
                JSON.stringify({
                    ...newCoupon,
                    creator: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + auth.token
                }
            );
            history.push('/');
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <React.Fragment>
            <AnimatePresence>
                { error && <ErrorModal paraMessage={ error } onBackdropClick={ clearError } /> }
            </AnimatePresence>
            { isLoading && <LoadingSpinner asOverlay /> }

            <Card className={ styles.card }>
                <AddCouponForm onCreateCoupon={ createCoupon } />
            </Card>
        </React.Fragment>
    );
};

export default AddCoupons;