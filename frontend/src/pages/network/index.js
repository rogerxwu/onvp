"use client";
import { useState, useEffect } from 'react';
import { RootLayout } from '@components/Layout';
import Map from '@components/Map';
import axios from 'axios';

const DEFAULT_CENTER = [45, -40]; // Centered between US and EU
const DEFAULT_ZOOM = 4;

export default function Network() {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });
    const [dataCenters, setDataCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data centers using axios
    useEffect(() => {
        const fetchDataCenters = async () => {
            try {
                const response = await axios.get('/datacenters.json');
                setDataCenters(response.data.dataCenters);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDataCenters();
    }, []);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth - 250,
                height: window.innerHeight - 60,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return <div>Loading data centers...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
                {({ TileLayer, Marker, Popup }) => (
                    <>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {dataCenters.map((dc) => (
                            <Marker
                                key={dc.id}
                                position={dc.location}
                            >
                                <Popup>
                                    <div>
                                        <h3>{dc.name}</h3>
                                        <p>Region: {dc.region}</p>
                                        <p>Status: {dc.status}</p>
                                        <p>Location: {dc.location.join(', ')}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </>
                )}
            </Map>
        </div>
    );
}

Network.getLayout = function getLayout(page) {
    const sidebarContent = [
        {
            link: '/network/backbone-view',
            label: 'Backbone View',
        },
        {
            link: '/network/datacenter-view',
            label: 'Data Center View',
        },
        {
            link: '/network/regex-filter-view',
            label: 'Regex Filter View',
        }
    ];

    return (
        <RootLayout sidebarContent={sidebarContent}>{page}</RootLayout>
    )
}