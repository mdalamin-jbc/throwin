import PropTypes from "prop-types";

const ButtonPrimary = ({ style, btnText, icon }) => {
  return (
    <div
      className={`${style} w-[253px] text-center py-3 font-bold  font-hiragino `}
    >
      <div className="flex items-center justify-center"> 
        {icon} 
        <span className="">{btnText}</span> 
      </div>
    </div>
  );
};

ButtonPrimary.propTypes = {
  style: PropTypes.string,
  btnText: PropTypes.string,
  icon: PropTypes.element,
};

export default ButtonPrimary;
