import PropTypes from 'prop-types';

const TitleBar = ({ title, icon }) => {
  return (
    <div className="w-full mt-0 h-10 bg-[#49BBDF] text-white font-hiragino font-bold text-sm text-center my-3 flex justify-center items-center">
      {title}
      {icon}
    </div>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default TitleBar;
