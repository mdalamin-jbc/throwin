import PropTypes from "prop-types";

const DashboardButton = ({ styles, btnText }) => {
  return (
    <div className={`${styles} font-normal  text-lg text-white bg-[#49BBDF] text-center py-[14px]`}>
      <h4>{btnText}</h4>
    </div>
  );
};

DashboardButton.propTypes = {
  styles: PropTypes.string,
  btnText: PropTypes.string,
};

export default DashboardButton;
