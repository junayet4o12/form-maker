
const ComponentsTitle = ({ title1, title2, title3, description }) => {
    return (
        <div className="px-10 sm:px-32 pt-4">
            <h2 className="text-3xl font-medium pt-5 pb-2 text-gray-600 uppercase">{title1} <br /> {title2}  <span className="text-4xl font-semibold text-primary">{title3}</span></h2>
            <p className="text-base font-medium pb-7 max-w-2xl">{description}</p>
        </div>
    );
};

export default ComponentsTitle;