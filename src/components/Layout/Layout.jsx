import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.contentArea}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
