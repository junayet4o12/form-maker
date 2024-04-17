/* eslint-disable react/prop-types */
import FillUpDataCardsDatum from "./FillUpDataCardsDatum";

const FillUpFormDataCard = ({ data }) => {
    return (
        <div>
            {
                data.map((datum, idx) => {
                    return <FillUpDataCardsDatum data={datum} key={idx} />
                })
            }
        </div>
    );
};

export default FillUpFormDataCard;