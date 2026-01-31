import React from 'react';

// Componente ResumeItem para exibir um item de resumo com rótulo e valor
function ResumeItem({ label, value, highlight }) {
  return (
    <div className="flex justify-between rounded-lg border border-gray-100 px-4 py-3">
      <span className="text-sm text-gray-600">{label}</span>
      <span
        className={`text-sm font-semibold ${
          highlight ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default ResumeItem;