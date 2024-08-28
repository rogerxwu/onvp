'use client';

import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import DataSourceSelector from './data_source_selector'; // Import data source selector
import NodeFilter from './node_filter'; // Import node filter component
import TimeSelector from './time_selector'; // Import time selector component
import CurveStyleSwitcher from './curve_style_switcher'; // Import curve style switcher component


const NetworkDiagram = () => {
  const cyRef = useRef(null);
  const [networkData, setNetworkData] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [dataSource, setDataSource] = useState('static');
  const [filteredElements, setFilteredElements] = useState([]);
  const [curveStyle, setCurveStyle] = useState('bezier')

  // Fetch the data from the JSON file or database when the component mounts
  useEffect(() => {
    if (dataSource === 'static') {
      fetch('/networkData.json')
        .then(response => response.json())
        .then(data => {
          setNetworkData(data);
          setSelectedTime(data[0]?.datetime); // Set initial selection
          setFilteredElements([...data[0]?.nodes, ...data[0]?.edges]); // Set initial elements (nodes + edges)
        })
        .catch(error => console.error('Error fetching network data:', error));
    } else if (dataSource === 'database') {
      // Simulate a fetch from a MySQL database
      fetch('/api/getNetworkDataFromDatabase') // Example API route
        .then(response => response.json())
        .then(data => {
          setNetworkData(data);
          setSelectedTime(data[0]?.datetime); // Set initial selection
          setFilteredElements([...data[0]?.nodes, ...data[0]?.edges]); // Set initial elements (nodes + edges)
        })
        .catch(error => console.error('Error fetching network data from database:', error));
    }
  }, [dataSource]);

  // Update the network diagram when the selected time changes
  useEffect(() => {
    if (selectedTime && networkData.length > 0) {
      const dataForTime = networkData.find(item => item.datetime === selectedTime);
      setSelectedData(dataForTime);

      // Reset the filtered elements when a new time is selected
      setFilteredElements([...dataForTime.nodes, ...dataForTime.edges]);
    }
  }, [selectedTime, networkData]);

  // Update the Cytoscape diagram when filteredElements change
  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    cyRef.current = cytoscape({
      container: document.getElementById('cy'),
      elements: filteredElements, // Use filteredElements instead of the full dataset
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#66b2ff',
            label: 'data(name)', // Display node name as the label
          },
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#ccc',
            'curve-style': curveStyle,
            'control-point-step-size': 40,
            label: 'data(edge_name)', // Display edge_name as the label
            'text-rotation': 'autorotate',
            'font-size': '10px',
            'text-margin-y': -10,
            'text-valign': 'center',
            'text-halign': 'center',
          },
        },
        {
          selector: 'edge.hover', // Highlight on hover
          style: {
            'line-color': '#ff5733',
            width: 5,
          },
        },
        {
          selector: '.multi-link',
          style: {
            'target-arrow-shape': 'none',
          },
        },
      ],
      layout: {
        name: 'grid', // Default layout for now
      },
    });

    // Event listener for edges
    cyRef.current.on('mouseover', 'edge', function (evt) {
      evt.target.addClass('hover');
    });

    cyRef.current.on('mouseout', 'edge', function (evt) {
      evt.target.removeClass('hover');
    });
  }, [filteredElements]); // Rebuild the diagram whenever filteredElements changes


  // Add a separate useEffect to update curve style dynamically
  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.edges().style('curve-style', curveStyle); // Dynamically change the curve style of edges
    }
  }, [curveStyle]); // Re-run only when curveStyle changes

  // Zoom in function
  const zoomIn = () => {
    if (cyRef.current) {
      const zoomLevel = cyRef.current.zoom();
      cyRef.current.zoom(zoomLevel + 0.2);
    }
  };

  // Zoom out function
  const zoomOut = () => {
    if (cyRef.current) {
      const zoomLevel = cyRef.current.zoom();
      cyRef.current.zoom(zoomLevel - 0.2);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Data Source, Time Selection, and Node Filter in Same Row */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DataSourceSelector
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        </div>
        
        {networkData.length > 0 && (
          <TimeSelector
            selectedTime={selectedTime}
            networkData={networkData}
            setSelectedTime={setSelectedTime}
          />
        )}

        {selectedData && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NodeFilter
              nodes={selectedData.nodes}
              edges={selectedData.edges}
              setFilteredElements={setFilteredElements} // Pass the correct setter function
            />
          </div>
        )}
        <CurveStyleSwitcher
          curveStyle={curveStyle}
          setCurveStyle={setCurveStyle} // Pass the curve style setter
        />
      </div>

      {/* Cytoscape Container */}
      <div
        id="cy"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Zoom Controls */}
      <div style={{ position: 'absolute', right: '20px', bottom: '20px', display: 'flex', flexDirection: 'column' }}>
        <button
          onClick={zoomIn}
          style={{
            display: 'block',
            marginBottom: '10px',
            padding: '10px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '24px',
            width: '50px',
            height: '50px',
            textAlign: 'center',
            lineHeight: '30px',
          }}
        >
          +
        </button>
        <button
          onClick={zoomOut}
          style={{
            display: 'block',
            padding: '10px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '24px',
            width: '50px',
            height: '50px',
            textAlign: 'center',
            lineHeight: '30px',
          }}
        >
          −
        </button>
      </div>
    </div>
  );
};

export default NetworkDiagram;
