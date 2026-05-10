import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-white p-5">
      <h1 className="text-2xl font-bold text-indigo-500 mb-10">
        Wallet App
      </h1>

      <div className="space-y-3">
        <Link
          to="/dashboard"
          className="block bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          Home
        </Link>

        <button className="block text-gray-600 px-4 py-2">
          Wallets
        </button>

        <button className="block text-gray-600 px-4 py-2">
          Categories
        </button>

        <button className="block text-gray-600 px-4 py-2">
          Transactions
        </button>
      </div>
    </div>
  );
}

export default Sidebar;