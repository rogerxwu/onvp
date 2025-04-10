import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import IndexLayout from '../components/Layout/IndexLayout'

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.section}>
                <h2>Flow</h2>
                <div className={styles.box}> {/* Placeholder for Flow content */} </div>
            </div>
            <div className={styles.section}>
                <h2>Topology</h2>
                <div className={styles.box}> {/* Placeholder for Topology content */} </div>
            </div>
        </div>
    );
};

Home.getLayout = function getLayout(page) {
    return (
        <IndexLayout>{page}</IndexLayout>
    )
}
