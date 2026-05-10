import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";

function Dashboard() {

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Transactions state with localStorage
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  // Form states
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Add transaction function
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

    // Clear form
    setAmount("");
    setDescription("");
    setCategory("");

    // Close modal
    setShowModal(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
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

        {/* Transactions Header */}
        <div className="mt-10">

          <div className="flex justify-between items-center mb-5">

            <div>
              <h2 className="text-2xl font-bold">
                Transactions
              </h2>

              <p className="text-gray-500">
                List of your recent transactions
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Add Transaction
            </button>

          </div>

          {/* Transactions Table */}
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

      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">
                Add Transaction
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-2xl"
              >
                ×
              </button>

            </div>

            {/* Form */}
            <div className="space-y-4">

              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                onClick={handleAddTransaction}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg"
              >
                Save Transaction
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;