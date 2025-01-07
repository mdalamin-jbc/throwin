import PropTypes from "prop-types";

const TitleBar = ({ back, title, icon }) => {
  return (
    <div className="w-full mt-0  bg-[#49BBDF] text-white font-hiragino font-bold text-sm text-center  items-center rounded-lg">
      <div className="max-w-[430px] mx-auto h-10 flex justify-between items-center  px-6">
        <div className="text-4xl">{back}</div>
        <div className="-pl-6">
          {title}
          {icon}
        </div>
        <div></div>
      </div>
    </div>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.element,
  icon: PropTypes.element,
};

export default TitleBar;
