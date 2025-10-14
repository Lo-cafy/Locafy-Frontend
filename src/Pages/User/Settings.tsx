// pages/Settings.jsx
const Settings = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">Language</h3>
                <p className="text-sm text-gray-600">English</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">Edit</button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-gray-600">Enabled</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">Edit</button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">Privacy</h3>
                <p className="text-sm text-gray-600">Standard</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">Edit</button>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Disabled</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">Enable</button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">Login Activity</h3>
                <p className="text-sm text-gray-600">Last login: Today, 10:30 AM</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;