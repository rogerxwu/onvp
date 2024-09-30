"use client";
// app/visualization/page.js
import { useEffect, useState } from 'react';
import NetworkDiagram from '../../components/network_diagram'

export default function VisualizationPage() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });

  // Update the dimensions based on window size
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - 250, // Adjusting for the sidebar width
        height: window.innerHeight - 60, // Adjusting for the header height
      });
    };

    // Initial resize
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <NetworkDiagram />
    </div>
  );
}
