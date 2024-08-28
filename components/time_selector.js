import React from 'react';

const TimeSelector = ({ selectedTime, networkData, setSelectedTime }) => {
  const handleChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '20px' }}>
      <label htmlFor="time-select">Select Time:</label>
      <select
        id="time-select"
        value={selectedTime}
        onChange={handleChange}
      >
        {networkData.map((item, index) => (
          <option key={index} value={item.datetime}>
            {item.datetime}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector;
