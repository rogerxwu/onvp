import React, { useState } from 'react';

const Header = () => {

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <h1>Open Network Visualization</h1>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '24px',
  },
};

export default Header;
