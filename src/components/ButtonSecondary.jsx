import PropTypes from "prop-types";

const ButtonSecondary = ({ style, btnText, icon }) => {
  return (
    <div
      className={`${style}  text-center py-3 font-bold  font-hiragino text-white `}
    >
      <div className="flex items-center justify-center  gap-9">
        <div></div>
        <span className="">{btnText}</span>
        {icon}
      </div>
    </div>
  );
};

ButtonSecondary.propTypes = {
  style: PropTypes.string,
  btnText: PropTypes.string,
  icon: PropTypes.element,
};

export default ButtonSecondary;
