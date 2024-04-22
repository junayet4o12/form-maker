/* eslint-disable react/prop-types */
import FillUpDataCardsDatum from "./FillUpDataCardsDatum";

const FillUpFormDataCard = ({ data, idx, allQuestions }) => {
    const rearrangedData = [];

    allQuestions.forEach(item => {
        const foundObject = data?.allData.find(obj => obj.key === item);
        if (foundObject) {
            rearrangedData.push(foundObject);
        }
    });
    const dataForSharingToSibling = (a) => {
        const datum = rearrangedData?.find(b => b?.key == a);
        return datum

    }
    return (
        <div className="border-2 border-black rounded-md p-2 w-full max-w-[600px] mx-auto">
            {
                allQuestions?.map((a, idx) => <div className="flex gap-x-2 flex-wrap border border-black my-2 rounded-md px-1 py-2" key={idx}>{a}: <span className="font-bold"><FillUpDataCardsDatum data={dataForSharingToSibling(a)} /></span> </div>)
            }
            {/* {
                rearrangedData?.map((datum, idx) => {
                    return <FillUpDataCardsDatum data={datum} key={idx} allQuestions={allQuestions} />
                })
            } */}
        </div>
    );
};

export default FillUpFormDataCard;