import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";

function Dashboard() {

  // Load saved transactions from localStorage
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  // Form state
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Save transactions whenever they change
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Add transaction
  const handleAddTransaction = () => {

    // Prevent empty inputs
    if (!amount || !description || !category) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
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
            <h2 className="text-indigo-500 font-semibold">
              Balance
            </h2>

            <p className="text-3xl font-bold mt-4">
              KES 25,000
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-indigo-500 font-semibold">
              Income
            </h2>

            <p className="text-3xl font-bold mt-4">
              KES 25,000
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-indigo-500 font-semibold">
              Expenditure
            </h2>

            <p className="text-3xl font-bold mt-4">
              KES 25,000
            </p>
          </div>
        </div>

        {/* Add Transaction Form */}
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

        {/* Transactions Table */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-2">
            Transactions
          </h2>

          <p className="text-gray-500 mb-5">
            List of your recent transactions
          </p>

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

                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-t"
                    >
                      <td className="p-4">
                        {transaction.id}
                      </td>

                      <td className="p-4">
                        {transaction.amount}
                      </td>

                      <td className="p-4">
                        {transaction.description}
                      </td>

                      <td className="p-4">
                        {transaction.category}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500"
                    >
                      No transactions yet
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;