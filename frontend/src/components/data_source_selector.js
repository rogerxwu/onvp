import React, { useState } from 'react';

const DataSourceSelector = ({ dataSource, setDataSource }) => {
  const [showModal, setShowModal] = useState(false);

  // Handle creating a new data source
  const handleCreateDataSource = () => {
    setShowModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <label htmlFor="data-source-select">Data Source:</label>
      <select
        id="data-source-select"
        value={dataSource}
        onChange={(e) => setDataSource(e.target.value)}
      >
        <option value="static">Static Data</option>
        <option value="database">Database Data</option>
      </select>
      <button onClick={handleCreateDataSource} style={{ marginLeft: '10px' }}>
        Create Data Source
      </button>

      {/* Modal for Creating Data Source */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <h3>Create New Data Source</h3>
          <p>Set up a new data source for your network diagram.</p>
          {/* Add your data source setup form here */}
          <button onClick={handleModalClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DataSourceSelector;
