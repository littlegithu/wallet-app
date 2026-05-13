import React, { useState, useEffect } from 'react';

function App() {
  // ---------- ACTIVE TAB (now used for sidebar selection) ----------
  const [activeTab, setActiveTab] = useState('transactions'); // home, wallets, categories, transactions

  // ---------- STATE (same as before) ----------
  const [balance, setBalance] = useState(25000);
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([
    { id: 1, name: 'Cash', balance: 10000 },
    { id: 2, name: 'Bank', balance: 15000 },
    { id: 3, name: 'M-Pesa', balance: 0 },
  ]);
  const [categories, setCategories] = useState(['Bills', 'Food', 'Entertainment', 'Transport']);

  // Form states for Add Transaction
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [newWalletId, setNewWalletId] = useState(wallets[0]?.id || '');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  // Form states for Add Wallet
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletBalance, setNewWalletBalance] = useState('');

  // Form state for Add Category
  const [newCategoryName, setNewCategoryName] = useState('');

  // ---------- LOAD / SAVE DATA (same) ----------
  useEffect(() => {
    const savedTransactions = localStorage.getItem('walletApp_transactions');
    const savedWallets = localStorage.getItem('walletApp_wallets');
    const savedCategories = localStorage.getItem('walletApp_categories');
    const savedBalance = localStorage.getItem('walletApp_balance');

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedWallets) setWallets(JSON.parse(savedWallets));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedBalance) setBalance(JSON.parse(savedBalance));
  }, []);

  useEffect(() => {
    localStorage.setItem('walletApp_transactions', JSON.stringify(transactions));
    localStorage.setItem('walletApp_wallets', JSON.stringify(wallets));
    localStorage.setItem('walletApp_categories', JSON.stringify(categories));
    localStorage.setItem('walletApp_balance', JSON.stringify(balance));
  }, [transactions, wallets, categories, balance]);

  // ---------- HELPER FUNCTIONS ----------
  const getWalletName = (walletId) => {
    const wallet = wallets.find(w => w.id === walletId);
    return wallet ? wallet.name : 'Unknown';
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (!newAmount || !newDesc || !newWalletId) return;
    const amountNum = parseFloat(newAmount);
    if (isNaN(amountNum)) return;

    setBalance(prev => prev + amountNum);
    setWallets(prevWallets =>
      prevWallets.map(wallet =>
        wallet.id === parseInt(newWalletId)
          ? { ...wallet, balance: wallet.balance + amountNum }
          : wallet
      )
    );

    const newTransaction = {
      id: Date.now(),
      amount: amountNum,
      description: newDesc,
      category: newCategory,
      walletId: parseInt(newWalletId),
      date: newDate,
      createdAt: new Date().toLocaleString(),
    };
    setTransactions([newTransaction, ...transactions]);

    setNewAmount('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const deleteTransaction = (id) => {
    const txToRemove = transactions.find(tx => tx.id === id);
    if (txToRemove) {
      setBalance(prev => prev - txToRemove.amount);
      setWallets(prevWallets =>
        prevWallets.map(wallet =>
          wallet.id === txToRemove.walletId
            ? { ...wallet, balance: wallet.balance - txToRemove.amount }
            : wallet
        )
      );
      setTransactions(transactions.filter(tx => tx.id !== id));
    }
  };

  const addWallet = () => {
    if (!newWalletName.trim()) return;
    const newId = Date.now();
    const balanceNum = parseFloat(newWalletBalance) || 0;
    setWallets([...wallets, { id: newId, name: newWalletName.trim(), balance: balanceNum }]);
    setNewWalletName('');
    setNewWalletBalance('');
  };

  const deleteWallet = (id) => {
    const hasTransactions = transactions.some(tx => tx.walletId === id);
    if (hasTransactions) {
      alert('Cannot delete wallet that has transactions. Delete transactions first or move them.');
      return;
    }
    setWallets(wallets.filter(w => w.id !== id));
  };

  const addCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName('');
    }
  };

  const deleteCategory = (catToDelete) => {
    const hasTransactions = transactions.some(tx => tx.category === catToDelete);
    if (hasTransactions) {
      alert(`Cannot delete category "${catToDelete}" because it is used in transactions.`);
      return;
    }
    setCategories(categories.filter(cat => cat !== catToDelete));
  };

  const totalIncome = transactions.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // ---------- RENDER MAIN CONTENT BASED ON ACTIVE TAB ----------
  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="home-view">
            <h2 className="section-title">Welcome to your Wallet</h2>
            <p>Manage your finances across multiple wallets and categories.</p>
            <div className="home-stats">
              <div className="stat-card">
                <span>Total Wallets</span>
                <strong>{wallets.length}</strong>
              </div>
              <div className="stat-card">
                <span>Total Categories</span>
                <strong>{categories.length}</strong>
              </div>
              <div className="stat-card">
                <span>Total Transactions</span>
                <strong>{transactions.length}</strong>
              </div>
            </div>
          </div>
        );
      case 'wallets':
        return (
          <div>
            <h2 className="section-title">Your Wallets</h2>
            <div className="wallets-list">
              {wallets.map(wallet => (
                <div key={wallet.id} className="wallet-card">
                  <div className="wallet-info">
                    <strong>{wallet.name}</strong>
                    <span className="wallet-balance">KES {wallet.balance.toLocaleString()}</span>
                  </div>
                  <button onClick={() => deleteWallet(wallet.id)} className="delete-small">Delete</button>
                </div>
              ))}
            </div>
            <div className="add-form">
              <input type="text" placeholder="Wallet name" value={newWalletName} onChange={(e) => setNewWalletName(e.target.value)} />
              <input type="number" placeholder="Initial balance" value={newWalletBalance} onChange={(e) => setNewWalletBalance(e.target.value)} />
              <button onClick={addWallet}>+ Add Wallet</button>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div>
            <h2 className="section-title">Transaction Categories</h2>
            <div className="categories-list">
              {categories.map(cat => (
                <span key={cat} className="category-chip">
                  {cat}
                  <button onClick={() => deleteCategory(cat)} className="delete-chip">×</button>
                </span>
              ))}
            </div>
            <div className="add-form">
              <input type="text" placeholder="New category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
              <button onClick={addCategory}>+ Add Category</button>
            </div>
          </div>
        );
      case 'transactions':
      default:
        return (
          <div>
            <div className="transactions-header">
              <h2 className="section-title">Transactions</h2>
              <button className="add-tx-btn" onClick={() => setShowAddForm(true)}>+ Add Transaction</button>
            </div>
            {transactions.length === 0 ? (
              <p className="no-data">No transactions yet. Click "Add Transaction" to get started.</p>
            ) : (
              <div className="table-responsive">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Amount (KES)</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Wallet</th>
                      <th>Date</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id}>
                        <td>{tx.id}</td>
                        <td className={tx.amount >= 0 ? 'positive' : 'negative'}>{tx.amount >= 0 ? '+' : ''}{tx.amount.toLocaleString()}</td>
                        <td>{tx.description}</td>
                        <td>{tx.category}</td>
                        <td>{getWalletName(tx.walletId)}</td>
                        <td>{tx.date}</td>
                        <td>{tx.createdAt}</td>
                        <td><button onClick={() => deleteTransaction(tx.id)} className="delete-small">Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
    }
  };

  // ---------- MAIN LAYOUT WITH SIDEBAR ----------
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>💰 Wallet App</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-item ${activeTab === 'wallets' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallets')}
          >
            👛 Wallets
          </button>
          <button 
            className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            📁 Categories
          </button>
          <button 
            className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            📄 Transactions
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Summary Cards (always visible on top) */}
        <div className="summary-cards">
          <div className="card">
            <h3>Balance</h3>
            <p className="amount">KES {balance.toLocaleString()}</p>
          </div>
          <div className="card income">
            <h3>Income</h3>
            <p className="amount">KES {totalIncome.toLocaleString()}</p>
          </div>
          <div className="card expense">
            <h3>Expenditure</h3>
            <p className="amount">KES {totalExpense.toLocaleString()}</p>
          </div>
        </div>

        {/* Dynamic Content */}
        {renderMainContent()}
      </main>

      {/* Add Transaction Modal (same as before) */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>➕ Add Transaction</h2>
            <form onSubmit={addTransaction}>
              <input type="number" placeholder="Amount (positive = income, negative = expense)" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} required />
              <input type="text" placeholder="Description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required />
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
              <select value={newWalletId} onChange={(e) => setNewWalletId(e.target.value)} required>
                <option value="">Select Wallet</option>
                {wallets.map(wallet => <option key={wallet.id} value={wallet.id}>{wallet.name} (Balance: KES {wallet.balance.toLocaleString()})</option>)}
              </select>
              <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          background: #f1f5f9;
        }
        /* App Layout with Sidebar */
        .app-layout {
          display: flex;
          min-height: 100vh;
        }
        /* Sidebar */
        .sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 8px rgba(0,0,0,0.02);
        }
        .sidebar-header {
          padding: 28px 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        .sidebar-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          padding: 16px 12px;
          gap: 8px;
        }
        .nav-item {
          background: none;
          border: none;
          padding: 12px 16px;
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          color: #334155;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-item:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .nav-item.active {
          background: #eef2ff;
          color: #3b82f6;
          font-weight: 600;
        }
        /* Main Content */
        .main-content {
          flex: 1;
          padding: 28px 32px;
          background: #f8fafc;
        }
        /* Summary Cards */
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 36px;
        }
        .card {
          background: white;
          border-radius: 24px;
          padding: 20px 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: transform 0.1s ease;
        }
        .card h3 {
          font-size: 0.9rem;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .amount {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .income .amount { color: #10b981; }
        .expense .amount { color: #ef4444; }
        /* Section Titles */
        .section-title {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #0f172a;
        }
        .transactions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .add-tx-btn {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 40px;
          padding: 10px 20px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .add-tx-btn:hover { background: #2563eb; }
        /* Table */
        .table-responsive {
          overflow-x: auto;
          border-radius: 20px;
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .transactions-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }
        .transactions-table th,
        .transactions-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        .transactions-table th {
          background: #f8fafc;
          font-weight: 600;
          color: #1e293b;
          font-size: 0.85rem;
        }
        .positive { color: #10b981; font-weight: 600; }
        .negative { color: #ef4444; font-weight: 600; }
        .delete-small {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 0.8rem;
          padding: 4px 8px;
          border-radius: 8px;
          transition: background 0.1s;
        }
        .delete-small:hover { background: #fee2e2; }
        /* Wallets & Categories Cards */
        .wallets-list, .categories-list {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 28px;
        }
        .wallet-card {
          background: white;
          border-radius: 20px;
          padding: 16px 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          min-width: 180px;
        }
        .wallet-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .wallet-balance {
          font-weight: 700;
          color: #0f172a;
        }
        .category-chip {
          background: #f1f5f9;
          padding: 8px 16px;
          border-radius: 40px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: #1e293b;
        }
        .delete-chip {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #ef4444;
          padding: 0 4px;
          border-radius: 20px;
        }
        .add-form {
          background: white;
          padding: 20px;
          border-radius: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: flex-end;
          margin-top: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .add-form input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 16px;
          font-size: 0.9rem;
        }
        .add-form button {
          background: #10b981;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 40px;
          font-weight: 500;
          cursor: pointer;
        }
        /* Home view stats */
        .home-stats {
          display: flex;
          gap: 20px;
          margin-top: 24px;
          flex-wrap: wrap;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 20px;
          text-align: center;
          flex: 1;
          min-width: 140px;
        }
        .stat-card span {
          display: block;
          color: #64748b;
          margin-bottom: 8px;
        }
        .stat-card strong {
          font-size: 1.8rem;
          color: #0f172a;
        }
        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(2px);
          z-index: 1000;
        }
        .modal-content {
          background: white;
          border-radius: 32px;
          padding: 28px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 20px 35px rgba(0,0,0,0.2);
        }
        .modal-content h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.6rem;
        }
        .modal-content form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .modal-content input, .modal-content select {
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 16px;
          font-size: 0.95rem;
        }
        .modal-buttons {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }
        .save-btn, .cancel-btn {
          padding: 10px 20px;
          border-radius: 40px;
          border: none;
          font-weight: 500;
          cursor: pointer;
        }
        .save-btn { background: #3b82f6; color: white; }
        .cancel-btn { background: #e2e8f0; color: #1e293b; }
        .no-data {
          text-align: center;
          color: #64748b;
          padding: 48px;
          background: white;
          border-radius: 24px;
        }
        /* Responsive */
        @media (max-width: 768px) {
          .app-layout {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
          }
          .sidebar-header {
            padding: 0;
            border: none;
          }
          .sidebar-nav {
            flex-direction: row;
            padding: 0;
            gap: 4px;
          }
          .nav-item {
            padding: 8px 12px;
            font-size: 0.8rem;
          }
          .main-content {
            padding: 20px;
          }
          .summary-cards {
            gap: 12px;
          }
          .card .amount {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;