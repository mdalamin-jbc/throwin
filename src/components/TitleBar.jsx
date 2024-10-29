

const TitleBar = ({title}) => {
    return (
        <div className="w-full h-10 bg-[#49BBDF] text-white font-hiragino font-bold text-sm text-center my-3 flex justify-center items-center">
            {title}
        </div>
    );
};

export default TitleBar;