import React from "react";

const Analytics = ({ analytics }) => {
  if (!analytics) return null;
  const { totalUsers, usersByLocation, topLocation } = analytics;

  return (
    <div className="card">
      <h2>Analytics</h2>
      <div className="analytics-grid">
        <div className="stat">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="stat">
          <h3>Top Location</h3>
          <p>
            {topLocation ? `${topLocation._id} (${topLocation.count})` : "N/A"}
          </p>
        </div>
      </div>

      <h3>Users by Location</h3>
      <ul className="location-list">
        {usersByLocation.map((item) => (
          <li key={item._id}>
            <span>{item._id}</span>
            <span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
