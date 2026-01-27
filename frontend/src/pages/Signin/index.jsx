import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import FormField from "../../components/FormField";
import { inputBase } from "../../utils/inputbase";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "/dashboard";
    } catch {
      setError("Erro ao criar conta");
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/dashboard";
    } catch {
      setError("Erro ao criar conta com Google");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* CABEÇALHO */}
        <section>
          <h1 className="text-2xl font-semibold text-gray-800">
            Criar nova conta
          </h1>
          <p className="text-sm text-gray-500">
            Cadastre um novo usuário para acessar o sistema
          </p>
        </section>

        {/* FORMULÁRIO */}
        <section className="rounded-xl bg-white p-6 shadow-sm space-y-6">
          <form className="space-y-6" onSubmit={handleCreateAccount}>
            <FormField label="E-mail">
              <input
                type="email"
                className={inputBase}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField label="Senha">
                <input
                  type="password"
                  className={inputBase}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormField>

              <FormField label="Confirmar senha">
                <input
                  type="password"
                  className={inputBase}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormField>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Criar conta
            </button>
          </form>

          {/* DIVISOR */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* GOOGLE SIGN UP */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Criar conta com Google
          </button>
        </section>
      </div>
    </main>
  );
}

export default Signin;
