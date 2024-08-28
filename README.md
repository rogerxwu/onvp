# Open Network Visualization Platform (ONVP)

The Open Network Visualization Platform (ONVP) is a web application designed to provide a better visualization for Layer 2 network connections. Built with flexibility and interactivity in mind, ONVP enables network engineers and IT professionals to effectively explore complex network topologies with ease. The platform offers a range of powerful features, including:

1. Interactive Network Diagrams: ONVP presents a comprehensive Layer 2 network connection diagram that allows users to zoom in/out and freely move elements, making it easy to navigate and analyze complex topologies.

2. Multiple Link Support: The platform supports rendering multiple links between two nodes, providing an accurate visual representation of network redundancy or multi-path configurations.

3. Regex-Based Node Filtering: ONVP empowers users with advanced filtering capabilities by supporting regular expressions (regex) to match node hostnames, offering precise control over which nodes are displayed and analyzed.

4. Flexible Link Display Modes: Users can toggle between modes to either display multiple links between two points or a single aggregated link, enhancing the versatility of the network visualization depending on the use case.

5. Static Data Source Input: ONVP seamlessly integrates static data source files as input, ensuring compatibility with pre-existing network data and offering the ability to quickly load and visualize network information.

6. Time-Based Topology Rendering: ONVP includes a feature to render network diagrams based on collected datetime data, allowing users to observe and compare topology changes over time. This makes it easier to track network evolution and quickly spot any alterations in the network's structure between different time periods.


## Installation
Install docker, docker compose, node.js>20 before you run the following cmds
Run in dev mode
```
MODE=dev docker compose up -d --build
```
Run in prod mode
```
MODE=prod docker compose up -d --build
```
Run locally
```
npm run build
npm start
```

## Tests
```
npm test
```



