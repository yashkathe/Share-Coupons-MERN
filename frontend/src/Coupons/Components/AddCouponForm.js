import React, { useState } from 'react';

import { motion } from "framer-motion";

import FormLabel from "../../Shared/Components/FormLabel";
import styles from './AddCouponForm.module.css';

const AddCouponForm = (props) => {

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ couponCode, setCouponCode ] = useState("");
    const [ company, setCompany ] = useState("");
    const [ expirationDate, setExpirationDate ] = useState("");

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    };

    const couponChangeHandler = (event) => {
        setCouponCode(event.target.value);
    };

    const companyChangeHandler = (event) => {
        setCompany(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setExpirationDate(event.target.value);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const newCoupon = {
            title,
            description,
            couponCode,
            company,
            expirationDate
        };

        props.onCreateCoupon(newCoupon);

        setTitle("");
        setDescription("");
        setCouponCode("");
        setCompany("");
        setExpirationDate("");
    };

    return (
        <form onSubmit={ submitHandler }>
            <FormLabel label="Title" type="text" changeHandler={ titleChangeHandler } value={ title } required={ true } />
            <FormLabel label="Description" type="text" changeHandler={ descriptionChangeHandler } value={ description } />
            <FormLabel label="Coupon Code" type="text" changeHandler={ couponChangeHandler } value={ couponCode } required={ true } />
            <FormLabel label="Company" type="text" changeHandler={ companyChangeHandler } value={ company } required={ true } />
            <FormLabel label="Expiration Date" type="date" changeHandler={ dateChangeHandler } value={ expirationDate } />
            <div className={ styles.form_element }>
                <motion.button type="submit" whileTap={ { scale: 0.8 } }>CREATE COUPON</motion.button>
            </div>
        </form>
    );
};

export default AddCouponForm;