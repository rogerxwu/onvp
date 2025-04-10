
import CustomNavbar from '../NavBar/CustomNavbar';
import styles from "../../styles/Layout.module.css"
import Sidebar from '../SideBar/Sidebar';


const Layout = ({ children }) => {

  return (
    <div className={styles.layout}>
      {/* NavBar */}
      <CustomNavbar />
      {/* Content */}
      <div className={styles.content} >
        {/* SideBar */}
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className={styles.mainContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
