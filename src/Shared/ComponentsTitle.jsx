/* eslint-disable react/prop-types */

const ComponentsTitle = ({ title1, title2, title3, description }) => {
    return (
        <div className="px-10 sm:px-32 py-4">
            <h2 className="text-xl font-medium pt-5 pb-2 text-white uppercase">{title1} <br /> {title2}  <span className="text-3xl font-semibold text-primary">{title3}</span></h2>
            {/* <p className="text-base font-medium pb-7 max-w-2xl text-white/90">{description}</p> */}
        </div>
    );
};

export default ComponentsTitle;