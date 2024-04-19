/* eslint-disable react/prop-types */
import FillUpDataCardsDatum from "./FillUpDataCardsDatum";

const FillUpFormDataCard = ({ data,idx }) => {
    return (
        <div className="border-2 border-black rounded-md p-2 w-full max-w-[400px] mx-auto">
            <p>{idx || 0}</p>
            {
                data?.allData.map((datum, idx) => {
                    return <FillUpDataCardsDatum data={datum} key={idx} />
                })
            }
        </div>
    );
};

export default FillUpFormDataCard;