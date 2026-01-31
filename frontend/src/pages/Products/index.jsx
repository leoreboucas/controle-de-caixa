import React, { useEffect, useState } from "react";
import ProductInfo from "../../components/ProductInfo";
import { Link} from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/products";
import { getIdToken } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

function Products() {
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState([]);

  // Buscar produtos
  useEffect(() => {
    const handleProducts = async () => {
      if (!user) return;

      const token = await getIdToken(user);
      const products = await getProducts(token);
      setProducts(products.data);
    };

    if (user) handleProducts();
  }, [user]);

  // Deletar produto
const handleDelete = async (productId) => {
  const confirmDelete = window.confirm(
    `Tem certeza que deseja excluir esse produto?`,
  );

  if (!confirmDelete) return;

  const token = await getIdToken(user);
  try {
    await deleteProduct(token, productId);
    setProducts(prev => 
      prev.filter(product => product._id !== productId)
    )
  } catch (error) {
    return error.response?.data?.message;
  }
};

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Produtos</h1>
            <p className="text-sm text-gray-500">
              Produtos cadastrados para referência do caixa
            </p>
          </div>

          <Link
            to="/products/new"
            className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            Novo produto
          </Link>
        </section>

        {/* LISTA DE PRODUTOS */}
        <section className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                {/* INFO DO PRODUTO */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-6 text-sm">
                    <ProductInfo
                      label="Custo"
                      value={`R$ ${product.purchasePrice}`}
                    />
                    <ProductInfo
                      label="Preço"
                      value={`R$ ${product.salePrice}`}
                    />
                    <ProductInfo
                      label="Margem de lucro"
                      value={`${(
                        ((product.salePrice - product.purchasePrice) /
                          product.salePrice) *
                        100
                      ).toFixed(2)} %`}
                      highlight
                    />
                  </div>
                </div>

                {/* AÇÕES */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 cursor-pointer py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Products;
