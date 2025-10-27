const ProgressBar = ({ percentage, height = 'h-3', color = 'bg-primary-600' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${height}`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
