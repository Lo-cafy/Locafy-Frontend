// pages/Dashboard.jsx
const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
          <p className="text-3xl">$159,001.21</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semib极 mb-4">BTC</h2>
          <p className="text-3xl">3.040000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ETH</h2>
          <p className="text-3xl">160.020000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;