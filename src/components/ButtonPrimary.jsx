import PropTypes from "prop-types";
const ButtonPrimary = ({ style, btnText }) => {
  return (
    <div className={`${style}  w-[253px]  text-center py-6 font-bold  `}>
      <h4>{btnText}</h4>
    </div>
  );
};

ButtonPrimary.propTypes = {
  style: PropTypes.string,
  btnText: PropTypes.string,
};

export default ButtonPrimary;
