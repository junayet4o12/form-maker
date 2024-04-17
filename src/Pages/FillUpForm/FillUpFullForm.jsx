/* eslint-disable react/prop-types */
// import React from 'react';

import FormBanner from "../../Shared/FormBanner";
import FillUpFormInputFields from "./FillUpFormInputFields";

const FillUpFullForm = ({ formDetails }) => {
    const { inputFields, userEmail, _id } = formDetails;
    console.log();
    return (
        <div className="py-10">
            <FormBanner img={formDetails?.formBgImg} title={formDetails?.title} description={formDetails?.description} />
            <FillUpFormInputFields inputFields={inputFields} userEmail={userEmail}
                _id={_id} />
        </div>
    );
};

export default FillUpFullForm;