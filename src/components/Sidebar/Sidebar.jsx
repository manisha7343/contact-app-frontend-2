import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") || "User" : "User";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const menu = (
    <>
      <div className={styles.profileArea}>
        <div className={styles.avatar}>{initials}</div>
        <div>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.userRole}>Member</div>
        </div>
      </div>

      <div className="list-group px-2">
        <Link to="/dashboard" className={`list-group-item list-group-item-action ${styles.menuItem}`}>
          <span className={styles.menuIcon}>📊</span>
          <span>Dashboard</span>
        </Link>

        <Link to="/contacts" className={`list-group-item list-group-item-action ${styles.menuItem}`}>
          <span className={styles.menuIcon}>👥</span>
          <span>Contacts</span>
        </Link>

        <Link to="/profile" className={`list-group-item list-group-item-action ${styles.menuItem}`}>
          <span className={styles.menuIcon}>⚙️</span>
          <span>Profile</span>
        </Link>
      </div>

      <div className={styles.footerNote}>Tip: Keep your contacts updated.</div>
    </>
  );

  return (
    <>
      {/* Offcanvas for small screens */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">{menu}</div>
      </div>

      {/* Static sidebar for large screens */}
      <aside className={`${styles.sidebar} d-none d-lg-block`}>
        {menu}
      </aside>
    </>
  );
}

export default Sidebar;