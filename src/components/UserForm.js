import React, { useEffect, useState } from "react";

const initialState = { name: "", email: "", location: "" };

const UserForm = ({ onSubmit, editingUser }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingUser) setForm(editingUser);
    else setForm(initialState);
  }, [editingUser]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <div className="card">
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="City / State"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingUser ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
