/* eslint-disable react/prop-types */
import FillUpDataCardsDatum from "./FillUpDataCardsDatum";
import logo from '../assets/FormifyLogo.png'
const FillUpFormDataCard = ({ data, idx, allQuestions, splitData }) => {
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
        <div className={`absolute w-full p-5 ${idx === splitData + 1 ? 'z-20' : ''}`}>
            <div className={`origin-left transition-all duration-500 border-[1.5px] border-secondary rounded-tl-[60px] rounded-br-[60px] rounded-tr-[10px] rounded-bl-[10px] overflow-hidden  py-7 px-5 w-full max-w-[700px] mx-auto bg-white ${idx === splitData + 1 ? ' scale-x-100   block delay-500 z-10' : ' scale-x-0'} relative`}>
                {
                    allQuestions?.map((a, idx) => <div className="flex gap-x-2 flex-wrap border border-secondary my-2 rounded-sm px-1 py-2" key={idx}><span className="text-secondary">{a}:</span> <span className="font-bold"><FillUpDataCardsDatum data={dataForSharingToSibling(a)} /></span> </div>)
                }
                {/* {
                rearrangedData?.map((datum, idx) => {
                    return <FillUpDataCardsDatum data={datum} key={idx} allQuestions={allQuestions} />
                })
            } */}
                <div className="bg-white/85 w-full h-full absolute top-0 left-0 -z-10"> </div>
                <div className=" bg-white w-full h-full absolute top-0 left-0 -z-20 py-2 px-7">
                    <img className="w-fll h-full object-cover mx-auto" src={logo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FillUpFormDataCard;