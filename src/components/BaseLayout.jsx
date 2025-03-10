import React from 'react';
import '../css/BaseLayout.css';

const BaseLayout = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="base-layout">
      <div className="sidebar">
        {/* TODO: I WILL PUT DUMMY NAV ITEMS HERE */}
       
      </div>
      <div className="main-content">
        <div className="top-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <div className="user-profile">
            <img src="https://i.pravatar.cc/300" alt="User Profile" />
            <p>{user.username}</p>
          </div>
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;