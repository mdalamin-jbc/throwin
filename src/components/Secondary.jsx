import PropTypes from "prop-types";

const Secondary = ({ style, btnText }) => {
  return (
    <div
      className={`${style}  w-[253px]  text-center py-3 font-bold bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino  text-white `}
    >
      <h4>{btnText}</h4>
    </div>
  );
};

Secondary.propTypes = {
  style: PropTypes.string,
  btnText: PropTypes.string,
};

export default Secondary;
