import PropTypes from "prop-types";

const ButtonPrimary = ({ style, btnText, icon }) => {
  return (
    <div
      className={`${style} w-[253px] text-center py-3 font-bold min-w-[253px]  font-hiragino text-white bg-gradient-to-r from-[#65D0F2] to-[#2399F4]`}
    >
      <div className="flex items-center justify-center"> {/* Use flexbox to align items */}
        {icon} {/* Icon */}
        <span className="">{btnText}</span> {/* Add margin to separate text from the icon */}
      </div>
    </div>
  );
};

ButtonPrimary.propTypes = {
  style: PropTypes.string,
  btnText: PropTypes.string,
  icon: PropTypes.element, // Add PropType for icon to ensure it's an element
};

export default ButtonPrimary;
