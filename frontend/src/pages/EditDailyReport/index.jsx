import React from 'react';
import { inputBase } from '../../utils/inputbase';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getIdToken } from 'firebase/auth';
import { getProducts } from '../../services/products';
import { getDailyReportById, updateDailyReport } from '../../services/dailyreport';
import { getExpense } from '../../services/expenses';
import FormField from '../../components/FormField';

// import { Container } from './styles';

function EditDailyReport() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);
    const [date, setDate] = useState('');
    const [initialCash, setInitialCash] = useState(0);
    const [finalCash, setFinalCash] = useState(0);
    const [products, setProducts] = useState([]);

    // Autenticação
    const [user, loading] = useAuthState(auth);
    const { id } = useParams();

    const navigate = useNavigate();

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

    // Buscar daily report e despesas
    useEffect(() => {
         if (!user || !id) return;
    
         async function fetchDailyReportAndExpenses() {
           const token = await getIdToken(user);
           try {
                const responseDR = await getDailyReportById(token, id);
                const responseEX = await getExpense(token, id)
                const mappedItems = responseEX.data.map((expense) => ({
                  id: expense._id,
                  name: expense.description,
                  quantity: expense.amount / expense.unitPrice,
                  unitPrice: expense.unitPrice,
                  total: expense.amount,
                }));
                
                setItems(mappedItems);
                setDate(responseDR.data.date.slice(0, 10));
                setInitialCash(responseDR.data.initialCash);
                setFinalCash(responseDR.data.finalCash);
           } catch (error) {
                return error.response?.data;
           }
         }
    
         fetchDailyReportAndExpenses();
       }, [user, id]);


    // Adicionar item
    const addItem = () => {
      const product = products.find((p) => p._id === selectedProduct);

      if (!product || quantity <= 0) return;

      const total = product.purchasePrice * quantity;

      setItems([
        ...items,
        {
          id: product._id,
          name: product.name,
          quantity,
          unitPrice: product.purchasePrice,
          total,
        },
      ]);

      setSelectedProduct("");
      setQuantity(1);
    };

    // Deletar item
    const deleteItem = (id) => {
      const filtteredItems = items.filter((expense) => expense.id != id);
      setItems(filtteredItems)
      
    }

    const totalExpenses = items.reduce((acc, item) => acc + item.total, 0);
    
    // Submeter formulário para atualização
    const handleSubmit = async () => {
        const dailyReport = {
          date,
          initialCash,
          finalCash,
          expensesData: []
        }
        
        for(let i=0; i < items.length; i++){
          dailyReport.expensesData.push({
            description: items[i].name,
            amount: items[i].quantity * items[i].unitPrice,
            unitPrice: items[i].unitPrice
          });
        }
    
        const token = await getIdToken(user)
        try {
          await updateDailyReport(token, id, dailyReport);
              navigate("/daily-report");
  
        } catch(error) {
          alert(error.response?.data?.message)
        }
    }    

    if(loading) return ''
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <section>
          <h1 className="text-2xl font-semibold text-gray-800">
            Edição de caixa diário
          </h1>
          <p className="text-sm text-gray-500">
            Altere os dados consolidados do caixa diário
          </p>
        </section>

        {/* FORMULÁRIO */}
        <section className="rounded-xl bg-white p-6 shadow-sm space-y-8">
          {/* DATA */}
          <FormField label="Data do caixa">
            <input
              type="date"
              className={inputBase}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>

          {/* VALORES PRINCIPAIS */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField label="Caixa inicial">
              <input
                type="number"
                className={inputBase}
                value={initialCash === 0 ? "" : initialCash}
                placeholder="0"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setInitialCash(0);
                    return;
                  }
                  setInitialCash(Number(value));
                }}
              />
            </FormField>

            <FormField label="Caixa final">
              <input
                type="number"
                className={`${inputBase} bg-gray-50`}
                value={finalCash === 0 ? "" : finalCash}
                placeholder="0"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setFinalCash(0);
                    return;
                  }
                  setFinalCash(Number(value));
                }}
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
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} — R${" "}
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
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 cursor-pointer py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition"
                          >
                            Deletar
                          </button>
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

          {/* AÇÕES */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <Link
              to="/daily-report"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              onClick={handleSubmit}
            >
              Salvar registro
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default EditDailyReport;