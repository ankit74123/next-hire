const StatCard = ({ icon, label, value, color, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-all duration-300 hover-lift border border-gray-100 group animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} text-white p-3 rounded-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
      {change && (
        <div className="text-xs text-gray-500 group-hover:text-gray-700 transition">{change}</div>
      )}
    </div>
  );
};

export default StatCard;
