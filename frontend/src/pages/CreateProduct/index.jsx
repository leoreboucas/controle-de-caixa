import React, { useState } from "react";
import FormField from "../../components/FormField";
import { inputBase } from "../../utils/inputbase";
import { auth } from "../../services/firebase";
import { getIdToken } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { newProduct } from "../../services/products";
import { Link, useNavigate } from "react-router-dom";

function CreateProduct() {
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const createNewProduct = async (e) => {
    e.preventDefault();

    if (Number(costPrice) > Number(salePrice)) {
      alert("O preço de custo não pode ser maior que o preço de venda");
      return;
    }

    if (!name || !costPrice || !salePrice) {
      alert("Preencha todos os campos");
      return;
    }

    const token = await getIdToken(user);
    const product = {
      name,
      purchasePrice: costPrice,
      salePrice,
    };

    try {
      await newProduct(token, product);
      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (loading)
    return <p className="p-6 text-sm text-gray-500">Carregando...</p>;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* HEADER */}
        <section className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800">Novo produto</h1>
          <p className="text-sm text-gray-500">
            Cadastre os produtos utilizados no caixa
          </p>
        </section>

        {/* CARD */}
        <section className="rounded-2xl bg-white p-6 shadow-sm transition-all">
          <form className="space-y-6" onSubmit={createNewProduct}>
            {/* NOME */}
            <FormField label="Nome do produto">
              <input
                type="text"
                placeholder="Ex: Refrigerante lata 350ml"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputBase} transition focus:ring-2 focus:ring-indigo-500`}
                required
              />
            </FormField>

            {/* PREÇOS */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField label="Preço de custo">
                <input
                  type="number"
                  className={`${inputBase} transition focus:ring-2 focus:ring-indigo-500`}
                  value={costPrice === 0 ? "" : costPrice}
                  placeholder="0"
                  onChange={(e) => setCostPrice(Number(e.target.value) || 0)}
                  required
                />
              </FormField>

              <FormField label="Preço de venda">
                <input
                  type="number"
                  className={`${inputBase} transition focus:ring-2 focus:ring-indigo-500`}
                  value={salePrice === 0 ? "" : salePrice}
                  placeholder="0"
                  onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                  required
                />
              </FormField>
            </div>

            {/* AÇÕES */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
              <Link
                to="/products"
                className="rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                Salvar produto
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default CreateProduct;
