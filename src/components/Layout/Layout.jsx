import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!localStorage.getItem("token")) {
        navigate("/login", { replace: true });
      }
    };

    checkAuth();

    const handlePageShow = (event) => {
      if (event.persisted || document.visibilityState === "visible") {
        checkAuth();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [navigate]);

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
