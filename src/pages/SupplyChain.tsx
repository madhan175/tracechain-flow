import React, { useState, useEffect } from 'react';

const SupplyChain: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('farmer');
  const [toast, setToast] = useState<{message: string, type: string, show: boolean}>({
    message: '',
    type: '',
    show: false
  });

  // Form states
  const [farmerForm, setFarmerForm] = useState({
    productName: '',
    batchId: '',
    location: ''
  });

  const [transferForm, setTransferForm] = useState({
    batchId: '',
    recipientAddress: ''
  });

  const [roleForm, setRoleForm] = useState({
    userAddress: '',
    role: 'farmer'
  });

  // Show toast notification
  const showToast = (message: string, type: string) => {
    setToast({ message, type, show: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Handle wallet connection
  const handleConnectWallet = () => {
    if (!isConnected) {
      setIsConnected(true);
      showToast('Wallet connected successfully!', 'success');
    } else {
      setIsConnected(false);
      showToast('Wallet disconnected', 'success');
    }
  };

  // Handle form submissions
  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      showToast('Please connect your wallet first', 'error');
      return;
    }
    simulateTransaction();
    setFarmerForm({ productName: '', batchId: '', location: '' });
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      showToast('Please connect your wallet first', 'error');
      return;
    }
    simulateTransaction();
    setTransferForm({ batchId: '', recipientAddress: '' });
  };

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      showToast('Please connect your wallet first', 'error');
      return;
    }
    simulateTransaction();
    setRoleForm({ userAddress: '', role: 'farmer' });
  };

  // Simulate blockchain transaction
  const simulateTransaction = () => {
    const gasFee = (Math.random() * (0.01 - 0.001) + 0.001).toFixed(4);
    if (confirm(`This transaction will require a gas fee of ${gasFee} STX. Confirm transaction?`)) {
      showToast('Transaction successful!', 'success');
    }
  };

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 50%, #6366f1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Supply Chain Management
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Track your products from farm to table using blockchain technology
          </p>
          
          <div className="flex justify-center mb-6">
            <button 
              onClick={handleConnectWallet}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
              style={{ boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)' }}
            >
              <i className="fa-solid fa-wallet"></i>
              {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
          </div>

          {isConnected && (
            <div className="mb-6 p-4 bg-green-100 rounded-lg border border-green-200">
              <div className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-shield-check text-green-600"></i>
                <span className="text-green-800">
                  Connected to Stacks Testnet
                </span>
                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  0x742d...35c9
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="tabs-container mb-8">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button 
              onClick={() => setActiveTab('farmer')}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg flex-1 justify-center transition-colors ${activeTab === 'farmer' ? 'bg-blue-500 text-white' : ''}`}
            >
              <i className="fa-solid fa-tractor"></i>
              Create Batch
            </button>
            <button 
              onClick={() => setActiveTab('transfer')}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg flex-1 justify-center transition-colors ${activeTab === 'transfer' ? 'bg-blue-500 text-white' : ''}`}
            >
              <i className="fa-solid fa-truck"></i>
              Transfer Batch
            </button>
            <button 
              onClick={() => setActiveTab('roles')}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg flex-1 justify-center transition-colors ${activeTab === 'roles' ? 'bg-blue-500 text-white' : ''}`}
            >
              <i className="fa-solid fa-user-shield"></i>
              Assign Roles
            </button>
          </div>
        </div>

        <div className="tab-content">
          {/* Farmer Tab */}
          {activeTab === 'farmer' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
              <div className="card-header p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-tractor text-blue-500"></i>
                  Create New Batch
                </h2>
                <p className="text-gray-600 mt-1">
                  Start a new product batch on the blockchain
                </p>
              </div>
              <div className="card-content p-6">
                <form onSubmit={handleFarmerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      placeholder="e.g., Organic Tomatoes" 
                      value={farmerForm.productName}
                      onChange={(e) => setFarmerForm({...farmerForm, productName: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Batch ID (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      placeholder="e.g., BATCH-2024-001"
                      value={farmerForm.batchId}
                      onChange={(e) => setFarmerForm({...farmerForm, batchId: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      placeholder="e.g., California, USA"
                      value={farmerForm.location}
                      onChange={(e) => setFarmerForm({...farmerForm, location: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                  >
                    Create Batch
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Transfer Tab */}
          {activeTab === 'transfer' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
              <div className="card-header p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-truck text-blue-500"></i>
                  Transfer Batch
                </h2>
                <p className="text-gray-600 mt-1">
                  Transfer ownership of a batch to another party
                </p>
              </div>
              <div className="card-content p-6">
                <form onSubmit={handleTransferSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Batch ID</label>
                    <input 
                      type="number" 
                      className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      placeholder="e.g., 1" 
                      value={transferForm.batchId}
                      onChange={(e) => setTransferForm({...transferForm, batchId: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Stacks Address</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      placeholder="e.g., SP1234567890ABCDEF..." 
                      value={transferForm.recipientAddress}
                      onChange={(e) => setTransferForm({...transferForm, recipientAddress: e.target.value})}
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                  >
                    Transfer Batch
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
              <div className="card-header p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-user-shield text-blue-500"></i>
                  Assign User Roles
                </h2>
                <p className="text-gray-600 mt-1">
                  Assign roles to users in the supply chain
                </p>
              </div>
              <div className="card-content p-6">
                <form onSubmit={handleRoleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Stacks Address</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      placeholder="e.g., SP1234567890ABCDEF..." 
                      value={roleForm.userAddress}
                      onChange={(e) => setRoleForm({...roleForm, userAddress: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-md bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      value={roleForm.role}
                      onChange={(e) => setRoleForm({...roleForm, role: e.target.value})}
                    >
                      <option value="farmer">Farmer</option>
                      <option value="processor">Processor</option>
                      <option value="transporter">Transporter</option>
                      <option value="retailer">Retailer</option>
                      <option value="regulator">Regulator</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                  >
                    Assign Role
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-4 right-4 p-4 rounded-lg text-white transition-all duration-300 ease-in-out ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        style={{ zIndex: 1000 }}
      >
        {toast.message}
      </div>
    </div>
  );
};

export default SupplyChain;