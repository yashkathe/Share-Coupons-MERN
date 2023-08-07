import React, { useEffect, useState, useContext } from 'react';

import { AnimatePresence } from "framer-motion";

import ErrorModal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import CouponList from "../Components/CouponList";

import { AuthContext } from "../../Shared/Context/auth-context";

import { useHttpClient } from "../../Hooks/useHttpHook";
import SearchBox from "../../Shared/Components/SearchBox";

const Coupons = () => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedData, setLoadedData ] = useState();
    const [ searchBarResult, setSearchBarResult ] = useState();
    const [rerender, setRerender] = useState()

    useEffect(() => {
        setRerender(false)
        const fetchCoupons = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/coupons'
                );

                setLoadedData(responseData.coupons.filter(coupon => coupon.creator.toString() !== auth.userId));

            } catch(err) {}
        };
        fetchCoupons();
    }, [ sendRequest, auth, rerender ]);


    const fetchResults = async (q) => {
        const response = await fetch(
            `http://localhost:5000/api/coupons/search/query?query=${q}`
        );
        const responseData = await response.json();
        setSearchBarResult(responseData.coupons.filter(coupon =>
            coupon.creator.toString() !== auth.userId &&
            coupon.boughtBy === null));
    };

    const searchValueHandler = async (searchVal) => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/coupons/search/query?query=${searchVal}`
            );

            setLoadedData(responseData.coupons.filter(coupon =>
                coupon.creator.toString() !== auth.userId &&
                coupon.boughtBy === null
            ));

        } catch(err) {}
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <AnimatePresence>
                { error && <ErrorModal paraMessage={ error } onBackdropClick={ clearError } /> }
            </AnimatePresence>
            {
                loadedData && loadedData.length &&
                <SearchBox
                    fetchResults={ fetchResults }
                    searchBarResult={ searchBarResult }
                    search={ searchValueHandler }
                />
            }
            { !isLoading && loadedData && (
                <CouponList
                    items={ loadedData }
                    emptyCouponsTitle="No Coupons found"
                    redirectLink="/coupon/new"
                    redirectLinkName="Create one"
                    onRedirect={() => {setRerender(true)}}
                    redirectButtonName="Return Home"
                />) }
        </React.Fragment>
    );
};

export default Coupons;