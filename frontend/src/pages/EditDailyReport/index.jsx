import React, { useEffect, useState } from "react";
import { inputBase } from "../../utils/inputbase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { getProducts } from "../../services/products";
import {
  getDailyReportById,
  updateDailyReport,
} from "../../services/dailyreport";
import { getExpense } from "../../services/expenses";
import FormField from "../../components/FormField";

function EditDailyReport() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");
  const [initialCash, setInitialCash] = useState(0);
  const [finalCash, setFinalCash] = useState(0);
  const [products, setProducts] = useState([]);

  const [user, loading] = useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    async function fetchProducts() {
      const token = await getIdToken(user);
      const products = await getProducts(token);
      setProducts(products.data);
    }

    fetchProducts();
  }, [user]);

  useEffect(() => {
    if (!user || !id) return;

    async function fetchData() {
      const token = await getIdToken(user);

      const responseDR = await getDailyReportById(token, id);
      const responseEX = await getExpense(token, id);

      setDate(responseDR.data.date.slice(0, 10));
      setInitialCash(responseDR.data.initialCash);
      setFinalCash(responseDR.data.finalCash);

      const mappedItems = responseEX.data.map((expense) => ({
        id: expense._id,
        name: expense.description,
        quantity: expense.amount / expense.unitPrice,
        unitPrice: expense.unitPrice,
        total: expense.amount,
      }));

      setItems(mappedItems);
    }

    fetchData();
  }, [user, id]);

  const addItem = () => {
    const product = products.find((p) => p._id === selectedProduct);
    if (!product || quantity <= 0) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: product.name,
        quantity,
        unitPrice: product.purchasePrice,
        total: product.purchasePrice * quantity,
      },
    ]);

    setSelectedProduct("");
    setQuantity(1);
  };

  const deleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const totalExpenses = items.reduce((acc, item) => acc + item.total, 0);

  const handleSubmit = async () => {
    const dailyReport = {
      date,
      initialCash,
      finalCash,
      expensesData: items.map((item) => ({
        description: item.name,
        amount: item.quantity * item.unitPrice,
        unitPrice: item.unitPrice,
      })),
    };

    const token = await getIdToken(user);
    await updateDailyReport(token, id, dailyReport);
    navigate("/daily-report");
  };

  if (loading)
    return <p className="p-6 text-sm text-gray-500">Carregando...</p>;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* HEADER */}
        <section>
          <h1 className="text-2xl font-semibold text-gray-800">
            Editar caixa diário
          </h1>
          <p className="text-sm text-gray-500">
            Atualize os dados consolidados do caixa
          </p>
        </section>

        {/* FORM */}
        <section className="rounded-2xl bg-white p-6 shadow-sm space-y-8">
          <FormField label="Data do caixa">
            <input
              type="date"
              className={inputBase}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField label="Caixa inicial">
              <input
                type="number"
                className={inputBase}
                value={initialCash || ""}
                onChange={(e) => setInitialCash(Number(e.target.value || 0))}
              />
            </FormField>

            <FormField label="Caixa final">
              <input
                type="number"
                className={`${inputBase} bg-gray-50`}
                value={finalCash || ""}
                onChange={(e) => setFinalCash(Number(e.target.value || 0))}
              />
            </FormField>
          </div>

          {/* DESPESAS */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-700">
              Despesas registradas
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField label="Produto">
                <select
                  className={inputBase}
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} — R$
                      {Number(product.purchasePrice)
                        .toFixed(2)
                        .replace(".", ",")}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Quantidade">
                <input
                  type="number"
                  min={1}
                  className={inputBase}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormField>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addItem}
                  className="w-full rounded-lg border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {items.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Produto</th>
                      <th className="px-4 py-2 text-center">Qtd</th>
                      <th className="px-4 py-2 text-right">Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                          R$ {item.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t border-gray-200">
                    <tr>
                      <td colSpan={2} className="px-4 py-2 font-medium">
                        Total de despesas
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        R$ {totalExpenses.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <Link
              to="/daily-report"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Cancelar
            </Link>

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Salvar alterações
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default EditDailyReport;
