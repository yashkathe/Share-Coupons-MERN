import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import Card from "../../Shared/UI/Card";
import AddCouponForm from "../Components/AddCouponForm";
import ErrorModal from "../../Shared/UI/ErrorModal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import { useHttpClient } from "../../Hooks/useHttpHook";
import { AuthContext } from "../../Shared/Context/auth-context";

import styles from './AddCoupons.module.css';

const AddCoupons = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const history = useHistory()

    const createCoupon = async (newCoupon) => {
        try {
            await sendRequest(
                "http://localhost:5000/api/coupons",
                'POST',
                JSON.stringify({
                    ...newCoupon,
                    creator: auth.userId
                }),
                { 'Content-Type': 'application/json' }
            );
            history.push('/')
        } catch(err) {
            console.log(err);
        }

    };

    return (
        <React.Fragment>
            { error && <ErrorModal errorMessage={ error } onClick={ clearError } /> }
            { isLoading && <LoadingSpinner asOverlay /> }
            <Card className={ styles.card }>
                <AddCouponForm onCreateCoupon={ createCoupon } />
            </Card>
        </React.Fragment>
    );
};

export default AddCoupons;