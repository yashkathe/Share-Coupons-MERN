import React, { useState } from 'react';

import FormLabel from "../../Shared/Components/FormLabel";
import styles from './AddCouponForm.module.css';

const AddCouponForm = (props) => {

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ couponCode, setCouponCode ] = useState("");
    const [ company, setCompany ] = useState("");
    const [ date, setDate ] = useState("");

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
        setDate(event.target.value);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const newCoupon = {
            title,
            description,
            couponCode,
            company,
            date
        };

        props.onCreateCoupon(newCoupon);

        setTitle("");
        setDescription("");
        setCouponCode("");
        setCompany("");
        setDate("");
    };

    return (
        <form onSubmit={ submitHandler }>
            <FormLabel label="Title" type="text" changeHandler={ titleChangeHandler } value={ title } required={ true } />
            <FormLabel label="Description" type="text" changeHandler={ descriptionChangeHandler } value={ description } />
            <FormLabel label="Coupon Code" type="text" changeHandler={ couponChangeHandler } value={ couponCode } required={ true } />
            <FormLabel label="Company" type="text" changeHandler={ companyChangeHandler } value={ company } required={ true } />
            <FormLabel label="Expiration Date" type="date" changeHandler={ dateChangeHandler } value={ date } />
            <div className={ styles.form_element }>
                <button type="submit" >CREATE COUPON</button>
            </div>
        </form>
    );
};

export default AddCouponForm;