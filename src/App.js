import React, { useEffect, useState } from "react";
import "./index.css";
import API from "./api";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import Analytics from "./components/Analytics";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const fetchAnalytics = async () => {
    const res = await API.get("/users/analytics/summary");
    setAnalytics(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchAnalytics();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    if (editingUser) {
      await API.put(`/users/${editingUser._id}`, data);
      setEditingUser(null);
    } else {
      await API.post("/users", data);
    }
    fetchUsers();
    fetchAnalytics();
  };

  const handleDelete = async (id) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
    fetchAnalytics();
  };

 const handleNotify = async (id, payload) => {
  try {
    const res = await API.post(`/users/${id}/notify`, payload);
    alert(res.data.message || "Notification handled.");
  } catch (err) {
    console.error(err);
    alert(
      "Could not send notification (likely email config issue), but other features are working."
    );
  }
};


  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <div className="layout">
          <UserForm onSubmit={handleCreateOrUpdate} editingUser={editingUser} />
          <Analytics analytics={analytics} />
        </div>
        <UserTable
          users={users}
          onEdit={setEditingUser}
          onDelete={handleDelete}
          onNotify={handleNotify}
        />
      </main>
    </div>
  );
}

export default App;
