import React, { useContext, useState } from 'react';

import { AuthContext } from "../Context/auth-context";
import { useHttpClient } from "../../Hooks/useHttpHook";

import { AnimatePresence } from "framer-motion";

import styles from "./SearchBox.module.css";
import { FaSearch } from "react-icons/fa";

import SearchBoxResults from "./SearchBoxResults";
import CouponModal from "../UI/CouponModal";
import Modal from "../UI/Modal";

const SearchBox = (props) => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [ input, setInput ] = useState("");
    const [ isInputFocused, setInputFocused ] = useState(false);
    const [ showCouponModal, setShowCouponModal ] = useState(false);
    const [ couponData, setCouponData ] = useState();

    const searchInputHandler = (event) => {
        setInput(event.target.value);
        fetchData(event.target.value);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    const fetchData = async () => {
        props.fetchResults(input);
    };

    const resultClickHandler = async (couponId) => {
        try {
            setShowCouponModal(true);
            const responseData = await sendRequest(`http://localhost:5000/api/coupons/${couponId}`);
            setCouponData(responseData.coupon);
            setInput("");
        } catch {}
    };

    const addToCartHandler = async (couponId) => {
        try {
            setShowCouponModal(false);
            await sendRequest(`http://localhost:5000/api/coupons/cart`,
                'POST',
                JSON.stringify({
                    couponId: couponId,
                    userId: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + auth.token
                });
            setInput("");
        } catch(err) {}
    };


    return (
        <React.Fragment>
            { error &&
                <Modal paraMessage={ error } onBackdropClick={ clearError } />
            }

            <div className={ styles.wrapper }>
                <div className={ `${isInputFocused ? styles.wrapperChild : ""}` }>
                    <FaSearch
                        className={ `${isInputFocused ? styles.searchIcon : styles.searchIconDisabled}` } />
                    <input
                        className={ styles.input }
                        placeholder="Search Coupons"
                        value={ input }
                        onChange={ searchInputHandler }
                        onFocus={ handleInputFocus }
                        onBlur={ handleInputBlur }
                    />
                    <div className={ styles.searchResult }>
                        <AnimatePresence>
                            { props.searchBarResult &&
                                input.length !== 0 &&
                                props.searchBarResult.map(result => (
                                    <SearchBoxResults
                                        title={ result.title }
                                        company={ result.company }
                                        key={ result.id }
                                        onClick={ () => { resultClickHandler(result.id); } }
                                    />
                                ))
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                { showCouponModal && couponData && !isLoading &&
                    < CouponModal
                        onBackdropClick={ () => { setShowCouponModal(false); } }
                        loadedData={ couponData }
                        addToCart={ () => { addToCartHandler(couponData.id); } }
                        disableAddToCartBtn={ props.disableAddToCartBtn || couponData.creator.id === auth.userId ? true : false }
                        isCreatedBySameUser={ couponData.creator.id === auth.userId ? true : false }
                        isBoughtByUser={ couponData.boughtBy === auth.userId ? true : false }
                    /> }
            </AnimatePresence>
        </React.Fragment>
    );
};

export default SearchBox;