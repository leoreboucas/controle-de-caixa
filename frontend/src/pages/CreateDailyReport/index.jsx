import React, { useEffect, useState } from "react";
import FormField from "../../components/FormField";
import { inputBase } from "../../utils/inputbase";
import { getIdToken } from "firebase/auth";
import { getProducts } from "../../services/products";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { newDailyReport } from "../../services/dailyreport";
import { useNavigate } from "react-router-dom";

function todayISODate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function CreateDailyReport() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(todayISODate());
  const [initialCash, setInitialCash] = useState(0);
  const [finalCash, setFinalCash] = useState(0);
  const [products, setProducts] = useState([]);
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleProducts = async () => {
      if (!user) return;
      const token = await getIdToken(user);
      const products = await getProducts(token);
      setProducts(products.data);
    };
    if (user) handleProducts();
  }, [user]);

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

  const totalExpenses = items.reduce((acc, item) => acc + item.total, 0);

  const handleSubmit = async () => {
    const token = await getIdToken(user);

    const dailyReport = {
      date,
      initialCash,
      finalCash,
      expensesData: items.map((item) => ({
        description: item.name,
        unitPrice: item.unitPrice,
        amount: item.total,
      })),
    };

    await newDailyReport(token, dailyReport);
    navigate("/daily-report");
  };

  if (loading) return <p className="p-6">Carregando...</p>;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* HEADER */}
        <section>
          <h1 className="text-2xl font-semibold text-gray-800">
            Novo registro de caixa
          </h1>
          <p className="text-sm text-gray-500">
            Informe os dados consolidados do dia
          </p>
        </section>

        {/* FORM */}
        <section className="rounded-2xl bg-white p-6 shadow-sm space-y-8">
          {/* DATA */}
          <FormField label="Data do caixa">
            <input
              type="date"
              className={inputBase}
              value={date}
              max={todayISODate()}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>

          {/* VALORES */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField label="Caixa inicial">
              <input
                type="number"
                className={inputBase}
                placeholder="0"
                value={initialCash || ""}
                onChange={(e) => setInitialCash(Number(e.target.value) || 0)}
              />
            </FormField>

            <FormField label="Caixa final">
              <input
                type="number"
                className={`${inputBase} bg-gray-50`}
                placeholder="0"
                value={finalCash || ""}
                onChange={(e) => setFinalCash(Number(e.target.value) || 0)}
              />
            </FormField>
          </div>

          {/* DESPESAS */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">
              Despesas (produtos utilizados)
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField label="Produto">
                <select
                  className={inputBase}
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Selecione um produto</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} — R$ {Number(p.purchasePrice).toFixed(2)}
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
                  onChange={(e) => setQuantity(Number(e.target.value))}
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

            {/* LISTA */}
            {items.length > 0 && (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Produto</th>
                      <th className="px-4 py-2 text-center">Qtd</th>
                      <th className="px-4 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                          R$ {item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t">
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

          {/* AÇÕES */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end border-t pt-4">
            <button
              onClick={() => navigate("/daily-report")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Salvar registro
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}


export default CreateDailyReport;
