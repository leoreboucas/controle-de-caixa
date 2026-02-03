import { useState } from "react";

function PasswordInput({ value, onChange, placeholder = "Senha" }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full rounded-lg border border-gray-300
          px-4 py-2 pr-20 text-sm
          focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
          transition
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-xs font-medium text-gray-500
          hover:text-indigo-600
          transition-colors duration-200
        "
      >
        {showPassword ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}

export default PasswordInput;
