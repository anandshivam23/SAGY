export default function StatCard({ title, value, icon, color }) {
  const getColorClasses = () => {
    switch (color) {
      case "blue": return "bg-blue-50 text-blue-600 border-blue-100";
      case "green": return "bg-green-50 text-green-600 border-green-100";
      case "yellow": return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "red": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">{value}</h2>
        </div>
        <div className={`p-3 rounded-xl border ${getColorClasses()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
