import React from 'react';

// Componente DashboardCard para exibir informações resumidas no dashboard
function DashboardCard({ title, value, highlight }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`mt-2 text-xl font-semibold ${
          highlight ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}


export default DashboardCard;