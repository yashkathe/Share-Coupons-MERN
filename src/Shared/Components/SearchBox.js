import React, { useState } from 'react';

import { AnimatePresence } from "framer-motion";

import styles from "./SearchBox.module.css";

import { FaSearch } from "react-icons/fa";
import SearchBoxResults from "./SearchBoxResults";

const SearchBox = (props) => {

    const [ input, setInput ] = useState("");
    const [ isInputFocused, setInputFocused ] = useState(false);

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

    return (
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
                                    key={ result.id }
                                />
                            ))
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;