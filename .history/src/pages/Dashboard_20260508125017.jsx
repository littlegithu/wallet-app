import Sidebar from ".";

function Dashboard() {
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

        {/* Transactions */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-2xl font-bold">Transactions</h2>
              <p className="text-gray-500">
                List of your recent transactions
              </p>
            </div>

            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
              Add Transaction
            </button>
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
                <tr className="border-t">
                  <td className="p-4">1</td>
                  <td className="p-4">20,000</td>
                  <td className="p-4">Lorem ipsum</td>
                  <td className="p-4">Bills</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">2</td>
                  <td className="p-4">20,000</td>
                  <td className="p-4">Lorem ipsum</td>
                  <td className="p-4">Food</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;