import React, { useState } from "react";

const UserTable = ({ users, onEdit, onDelete, onNotify }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="card">
        <h2>User List</h2>

        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.location}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => onEdit(u)}>Edit</button>
                    <button onClick={() => onDelete(u._id)}>Delete</button>
                    <button
                      onClick={() =>
                        onNotify(u._id, {
                          subject: subject || "Hello from CRUD App",
                          message:
                            message ||
                            `Hi ${u.name}, this is a notification from the app.`,
                        })
                      }
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="notify-wrapper">
        <div className="notify-box">
          <h3>Notification Template</h3>

          <input
            className="notify-subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="notify-message"
            placeholder="Message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <small style={{ color: "#6b7280" }}>
            This subject & message will be used when you click "Notify".
          </small>
        </div>
      </div>
    </>
  );
};

export default UserTable;
