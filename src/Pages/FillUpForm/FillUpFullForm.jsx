// import React from 'react';

import FormBanner from "../../Shared/FormBanner";

const FillUpFullForm = ({formDetails}) => {
    return (
        <div>
            <FormBanner img={formDetails?.formBgImg} title={formDetails?.title} description={formDetails?.description} />
        </div>
    );
};

export default FillUpFullForm;