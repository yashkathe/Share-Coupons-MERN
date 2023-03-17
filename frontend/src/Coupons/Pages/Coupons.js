import React, { useEffect, useState } from 'react';

import ErrorModal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import CouponList from "../Components/CouponList";

import { useHttpClient } from "../../Hooks/useHttpHook";

const Coupons = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedData, setLoadedData ] = useState();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/coupons'
                );

                setLoadedData(responseData.coupons);
            } catch(err) {}
        };
        fetchCoupons();
    }, [ sendRequest ]);

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            { error && <ErrorModal paraMessage={ error } onBackdropClick={ clearError } /> }
            { !isLoading && loadedData && (<CouponList items={ loadedData } />) }
        </React.Fragment>
    );
};

export default Coupons;