"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

const Flow = () => {
    // State to store the response message
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch data from FastAPI when the component mounts
    useEffect(() => {
        // Define the endpoint URL
        const apiUrl = 'http://127.0.0.1:8000/hello';

        // Fetch the data from FastAPI
        axios.get(apiUrl)
            .then(response => {
                // On success, set the message state with the response
                setMessage(response.data.message);
                setLoading(false);
            })
            .catch(error => {
                // On error, set an error message
                setError('Failed to fetch data');
                setLoading(false);
            });
    }, []);  // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>
            <h1>FastAPI Hello World Example</h1>

            {loading && <p>Loading...</p>} {/* Show loading text while waiting */}

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if there's an issue */}

            {message && <p>{message}</p>} {/* Show the message once it's retrieved */}
        </div>
    );
};

export default Flow;


Flow.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}