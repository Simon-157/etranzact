import React from 'react';
import '../css/BaseLayout.css';

const BaseLayout = ({ children }) => {
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