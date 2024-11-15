import PropTypes from "prop-types";

const TitleBar = ({ back, title, icon }) => {
  return (
    <div className="w-full mt-0 h-10 bg-[#49BBDF] text-white font-hiragino font-bold text-sm text-center  flex justify-center  items-center">
      {back}
      {title}
      {icon}
    </div>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.element,
  icon: PropTypes.element,
};

export default TitleBar;
