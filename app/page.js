
export default function HomePage() {
  return (
    <div>
      <h2>Welcome to the Open Network Visualization Platform (ONVP)</h2>
      <p>The Open Network Visualization Platform (ONVP) is a web application designed to provide a better visualization for Layer 2 network connections. Built with flexibility and interactivity in mind, ONVP enables network engineers and IT professionals to effectively explore complex network topologies with ease. The platform offers a range of powerful features, including:</p>

      <p>1. Interactive Network Diagrams: ONVP presents a comprehensive Layer 2 network connection diagram that allows users to zoom in/out and freely move elements, making it easy to navigate and analyze complex topologies.</p>

      <p>2. Multiple Link Support: The platform supports rendering multiple links between two nodes, providing an accurate visual representation of network redundancy or multi-path configurations.</p>

      <p>3. Regex-Based Node Filtering: ONVP empowers users with advanced filtering capabilities by supporting regular expressions (regex) to match node hostnames, offering precise control over which nodes are displayed and analyzed.</p>

      <p>4. Flexible Link Display Modes: Users can toggle between modes to either display multiple links between two points or a single aggregated link, enhancing the versatility of the network visualization depending on the use case.</p>

      <p>5. Static Data Source Input: ONVP seamlessly integrates static data source files as input, ensuring compatibility with pre-existing network data and offering the ability to quickly load and visualize network information.</p>

      <p>6. Time-Based Topology Rendering: ONVP includes a feature to render network diagrams based on collected datetime data, allowing users to observe and compare topology changes over time. This makes it easier to track network evolution and quickly spot any alterations in the network structure between different time periods.</p>
    </div>
  );
}
