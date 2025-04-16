// components/Sidebar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Sidebar.module.css';
import axios from 'axios';

const Sidebar = ({ sidebarContent }) => {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sidebarContent === 'Data Center View') {
            const fetchSites = async () => {
                setLoading(true);
                try {
                    const response = await axios.get('/sites.json');
                    setSites(response.data.sites);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
            fetchSites();
        }
    }, [sidebarContent]);

    return (
        <div className={styles.sidebar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/" className={styles.navLink}>
                        <span>Home</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/about" className={styles.navLink}>
                        <span>About Us</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/network" className={styles.navLink}>
                        <span>Network</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/network/datacenter-view" className={styles.navLink}>
                        <span>Data Center View</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/network/regex-filter-view" className={styles.navLink}>
                        <span>Regex Filter View</span>
                    </Link>
                </li>
            </ul>

            {sidebarContent === 'Data Center View' && (
                <div className={styles.sitesContainer}>
                    {loading ? (
                        <div className={styles.loading}>Loading sites...</div>
                    ) : error ? (
                        <div className={styles.error}>Error: {error}</div>
                    ) : (
                        <ul className={styles.sitesList}>
                            {sites.map((site) => (
                                <li key={site.id} className={styles.siteItem}>
                                    <div className={styles.siteName}>{site.name}</div>
                                    <div className={styles.siteStatus} data-status={site.status}>
                                        {site.status}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
