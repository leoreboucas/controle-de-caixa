import React, { useState } from "react";
import FormField from "../../components/FormField";
import { inputBase } from "../../utils/inputbase";

const mockProducts = [
  { id: 1, name: "Produto A", price: 10 },
  { id: 2, name: "Produto B", price: 25 },
  { id: 3, name: "Produto C", price: 5 },
];

function CreateDailyReport() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  const [initialCash, setInitialCash] = useState(0);
  const [grossRevenue, setGrossRevenue] = useState(0);

  const addItem = () => {
    const product = mockProducts.find((p) => p.id === Number(selectedProduct));

    if (!product || quantity <= 0) return;

    const total = product.price * quantity;

    setItems([
      ...items,
      {
        id: Date.now(),
        name: product.name,
        quantity,
        unitPrice: product.price,
        total,
      },
    ]);

    setSelectedProduct("");
    setQuantity(1);
  };

  const totalExpenses = items.reduce((acc, item) => acc + item.total, 0);
  const netRevenue = grossRevenue - totalExpenses;
  const finalCash = Number(initialCash) + netRevenue;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* CABEÇALHO */}
        <section>
          <h1 className="text-2xl font-semibold text-gray-800">
            Novo registro de caixa
          </h1>
          <p className="text-sm text-gray-500">
            Registre os dados consolidados do caixa diário
          </p>
        </section>

        {/* FORMULÁRIO */}
        <section className="rounded-xl bg-white p-6 shadow-sm space-y-8">
          {/* DATA */}
          <FormField label="Data do caixa">
            <input type="date" className={inputBase} />
          </FormField>

          {/* VALORES PRINCIPAIS */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField label="Caixa inicial">
              <input
                type="number"
                className={inputBase}
                value={initialCash}
                onChange={(e) => setInitialCash(e.target.value)}
              />
            </FormField>

            <FormField label="Receita bruta">
              <input
                type="number"
                className={inputBase}
                value={grossRevenue}
                onChange={(e) => setGrossRevenue(e.target.value)}
              />
            </FormField>

            <FormField label="Receita líquida">
              <input
                type="number"
                className={`${inputBase} bg-gray-50`}
                value={netRevenue}
                disabled
              />
            </FormField>

            <FormField label="Caixa final">
              <input
                type="number"
                className={`${inputBase} bg-gray-50`}
                value={finalCash}
                disabled
              />
            </FormField>
          </div>

          {/* DESPESAS POR PRODUTO */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-700">
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
                  {mockProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} — R$ {product.price}
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
                  className="w-full rounded-lg border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* LISTA DE DESPESAS */}
            {items.length > 0 && (
              <div className="rounded-lg border border-gray-200">
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
                      <tr key={item.id} className="border-t border-gray-100">
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
                  <tfoot className="border-t border-gray-200 bg-gray-50">
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

          {/* OBSERVAÇÕES */}
          <FormField label="Observações">
            <textarea
              rows={4}
              placeholder="Observações sobre o dia (opcional)"
              className={`${inputBase} resize-none`}
            />
          </FormField>

          {/* AÇÕES */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <a
              href="/daily-report"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
            >
              Cancelar
            </a>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
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
