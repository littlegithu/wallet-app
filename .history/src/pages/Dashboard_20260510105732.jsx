import { useState } from "react";
import Sidebar from "../components/sidebar";

function Dashboard() {

  // Transactions state
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: "20,000",
      description: "Lorem ipsum",
      category: "Bills",
    },
    {
      id: 2,
      amount: "20,000",
      description: "Lorem ipsum",
      category: "Food",
    },
  ]);

  // Form state
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Add transaction function
  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      amount,
      description,
      category,
    };

    setTransactions([...transactions, newTransaction]);

    // Clear inputs
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-indigo-500 font-semibold">Balance</h2>
            <p className="text-3xl font-bold mt-4">KES 25,000</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-indigo-500 font-semibold">Income</h2>
            <p className="text-3xl font-bold mt-4">KES 25,000</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-indigo-500 font-semibold">Expenditure</h2>
            <p className="text-3xl font-bold mt-4">KES 25,000</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow mt-10">
          <h2 className="text-xl font-bold mb-4">
            Add Transaction
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-lg"
            />
          </div>

          <button
            onClick={handleAddTransaction}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Add Transaction
          </button>
        </div>

        {/* Transactions */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-2xl font-bold">Transactions</h2>
              <p className="text-gray-500">
                List of your recent transactions
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">Id</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Category</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="p-4">{transaction.id}</td>
                    <td className="p-4">{transaction.amount}</td>
                    <td className="p-4">{transaction.description}</td>
                    <td className="p-4">{transaction.category}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;