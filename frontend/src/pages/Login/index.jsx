import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import FormField from "../../components/FormField";
import { inputBase } from "../../utils/inputbase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Login com e-mail e senha
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/dashboard";
    } catch {
      setError("E-mail ou senha inválidos");
    }
  };

  // Login com Google
  const handleGoogleLogin = async () => {
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/dashboard";
    } catch {
      setError("Erro ao autenticar com Google");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md space-y-6">
        <section className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Acessar sistema
          </h1>
          <p className="text-sm text-gray-500">
            Entre com sua conta para continuar
          </p>
        </section>

        {/* FORMULÁRIO */}
        <section className="rounded-xl bg-white p-6 shadow-sm space-y-6">
          <form className="space-y-6" onSubmit={handleLogin}>
            <FormField label="E-mail">
              <input
                type="email"
                className={inputBase}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Senha">
              <input
                type="password"
                className={inputBase}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Entrar
            </button>
          </form>

          {/* DIVISOR */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Entrar com Google
          </button>
        </section>
      </div>
    </main>
  );
}

export default Login;
