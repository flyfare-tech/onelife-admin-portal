import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]);
  const [activityType, setActivityType] = useState('online');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [username, setUsername] = useState('Prashanth');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchActivities(activityType);
  }, [activityType]);

  async function fetchActivities(type) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('type', type);

    if (error) {
      console.error('Error fetching activities:', error);
    } else {
      setActivities(data);
    }
  }

  function showActivityDetails(activity) {
    setSelectedActivity(activity);
  }

  function handleUsernameChange() {
    const newName = prompt('Enter new username:');
    if (newName) {
      setUsername(newName);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Onelife Admin Portal</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-2 bg-gray-200 rounded"
          >
            <span>Profile</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <div className="p-4">
                <p className="font-semibold">{username}</p>
              </div>
              <div className="border-t">
                <button onClick={handleUsernameChange} className="w-full text-left p-2 hover:bg-gray-100">Change Username</button>
                <button className="w-full text-left p-2 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="flex">
        <aside className="w-1/4 p-4 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Activities</h2>
          <div>
            <label htmlFor="activity-type" className="block mb-2">Select Activity Type:</label>
            <select
              id="activity-type"
              className="w-full p-2 border rounded"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <ul id="activity-list" className="mt-4">
            {activities.map(activity => (
              <li
                key={activity.id}
                className="p-2 border-b cursor-pointer"
                onClick={() => showActivityDetails(activity)}
              >
                {activity.name}
              </li>
            ))}
          </ul>
        </aside>
        <section className="w-3/4 p-4">
          <div id="activity-details" className="bg-white p-4 shadow-md">
            {selectedActivity ? (
              <>
                <h3 className="text-xl font-semibold">{selectedActivity.name}</h3>
                <p>{selectedActivity.description}</p>
              </>
            ) : (
              <p>Select an activity to see details</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
