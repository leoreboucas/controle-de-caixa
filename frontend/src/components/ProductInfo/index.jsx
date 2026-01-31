import React from 'react';

// Componente ProductInfo para exibir informações do produto
function ProductInfo({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p
        className={`text-sm font-semibold ${
          highlight ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default ProductInfo;