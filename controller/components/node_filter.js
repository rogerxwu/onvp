import React, { useState } from 'react';

const NodeFilter = ({ nodes, edges, setFilteredElements }) => {
  const [regex, setRegex] = useState('');

  const handleFilter = () => {
    try {
      const pattern = new RegExp(regex, 'i'); // 'i' for case-insensitive

      // Filter nodes based on the regex pattern
      const filteredNodes = nodes.filter(node => pattern.test(node.data.name));
      console.log(filteredNodes)

      // Get the ids of the filtered nodes
      const filteredNodeIds = filteredNodes.map(node => node.data.id);
      console.log(filteredNodeIds)

      // Filter edges that connect only the filtered nodes
      const filteredEdges = edges
        ? edges.filter(edge => 
            filteredNodeIds.includes(edge.data.source) && filteredNodeIds.includes(edge.data.target)
          )
        : [];
      console.log(filteredEdges)
      // Combine the filtered nodes and edges
      setFilteredElements([...filteredNodes, ...filteredEdges]);
    } catch (e) {
      console.error("Invalid regex:", e);
      setFilteredElements([]); // Reset on invalid regex
    }
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '20px' }}>
      <label htmlFor="regex-input">Filter (Regex):</label>
      <input
        id="regex-input"
        type="text"
        value={regex}
        onChange={(e) => setRegex(e.target.value)}
        placeholder="Enter regex..."
        style={{ marginLeft: '10px' }}
      />
      <button onClick={handleFilter} style={{ marginLeft: '10px' }}>Apply Filter</button>
    </div>
  );
};

export default NodeFilter;
