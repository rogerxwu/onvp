import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../../styles/CustomNavbar.module.css';

const CustomNavbar = () => {
    return (
        <Navbar expand="lg" className={styles.customNavbar}>

            <div className="d-flex align-items-center">
                <Nav href="/">
                    <Navbar.Brand className={styles.logo}>ONVP</Navbar.Brand>
                </Nav>
            </div>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={styles.navbarNav}>
                    <Nav.Link className={styles.navLink} href="/">Home</Nav.Link>
                    <Nav.Link className={styles.navLink} href="/flow">Flow</Nav.Link>
                    <Nav.Link className={styles.navLink} href="/network">Network</Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
};

export default CustomNavbar;

