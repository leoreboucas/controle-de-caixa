import React from 'react';

// Componente InfoItem para exibir um item de informação com rótulo e valor
function InfoItem({ label, value, highlight }) {
  return (
    <div className="rounded-lg border border-gray-100 px-4 py-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p
        className={`mt-1 text-sm font-semibold ${
          highlight ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}


export default InfoItem;