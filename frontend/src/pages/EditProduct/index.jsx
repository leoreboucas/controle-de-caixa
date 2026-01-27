import React, { useEffect, useState } from "react";
import FormField from "../../components/FormField";
import { inputBase } from "../../utils/inputbase";
import { auth } from "../../services/firebase";
import { getIdToken } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getProductsById, updateProduct } from "../../services/products";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  const [user, loading] = useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();

   useEffect(() => {
     if (!user || !id) return;

     async function fetchProduct() {
       const token = await getIdToken(user);
       const response = await getProductsById(token, id);

       setName(response.data.name);
       setCostPrice(response.data.purchasePrice);
       setSalePrice(response.data.salePrice);
     }

     fetchProduct();
   }, [user, id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || salePrice === "" || costPrice === "") return;

    if (Number(costPrice) > Number(salePrice)) {
      alert("O preço de custo não pode ser maior que o preço de venda");
      return;
    }

    const token = await getIdToken(user);
    
    const product = {
      name,
      purchasePrice: Number(costPrice),
      salePrice: Number(salePrice),
    };
    
    try {
        await updateProduct(token, id, product);
        navigate("/products");
    } catch(error) {
        console.log('lá')
        alert(error.response?.data?.message) || "Erro ao atualizar produto"
    }
  };

  if (loading) return null;
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* CABEÇALHO */}
        <section>
          <h1 className="text-2xl font-semibold text-gray-800">
            Editar produto
          </h1>
          <p className="text-sm text-gray-500">
            Edição de produtos utilizados no caixa
          </p>
        </section>

        {/* FORMULÁRIO */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* NOME */}
            <FormField label="Nome do produto">
              <input
                type="text"
                placeholder="Ex: Refrigerante lata 350ml"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputBase}
                required
              />
            </FormField>

            {/* PREÇOS */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField label="Preço de custo">
                <input
                  type="number"
                  className={inputBase}
                  value={costPrice === 0 ? "" : costPrice}
                  placeholder="0"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setCostPrice(0);
                      return;
                    }
                    setCostPrice(Number(value));
                  }}
                  required
                />
              </FormField>

              <FormField label="Preço de venda">
                <input
                  type="number"
                  className={inputBase}
                  value={salePrice === 0 ? "" : salePrice}
                  placeholder="0"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setSalePrice(0);
                      return;
                    }
                    setSalePrice(Number(value));
                  }}
                  required
                />
              </FormField>
            </div>

            {/* AÇÕES */}
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <Link
                to="/products"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Atualizar produto
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default EditProduct;
