import React from 'react';

const CurveStyleSwitcher = ({ curveStyle, setCurveStyle }) => {
  const handleStyleChange = (e) => {
    setCurveStyle(e.target.value);
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '20px' }}>
      <label htmlFor="curve-style">Curve Style:</label>
      <select
        id="curve-style"
        value={curveStyle}
        onChange={handleStyleChange}
        style={{ marginLeft: '10px' }}
      >
        <option value="bezier">Bezier</option>
        <option value="straight">Straight</option>
      </select>
    </div>
  );
};

export default CurveStyleSwitcher;
