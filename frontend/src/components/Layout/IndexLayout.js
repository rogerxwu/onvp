
import CustomNavbar from '../NavBar/CustomNavbar';
import styles from "../../styles/Layout.module.css"


const IndexLayout = ({ children }) => {

    return (
        <div className={styles.layout}>
            {/* NavBar */}
            <CustomNavbar />
            {/* Content */}
            <div className={styles.indexContent} >
                {/* Main Content */}
                {children}
            </div>
        </div>
    );
};

export default IndexLayout;
