const StatCard = ({ icon, label, value, color, change }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
      {change && (
        <div className="text-xs text-gray-500">{change}</div>
      )}
    </div>
  );
};

export default StatCard;
