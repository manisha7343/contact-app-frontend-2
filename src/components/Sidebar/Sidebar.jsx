import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userAPI } from "../../services/api";

function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    // 1. token check kro
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // 2. function to fetch profile from backend
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { response, data } = await userAPI.getProfile();

        // ✅ SAFE CHECK: data aur response dono sahi milne chahiye
        if (response && response.ok && data && data.success) {
          setUser(data.user);
          console.log("data user -----------------------", data.user);
        } else {
          // ✅ SAFE EXTRACTION: Agar data ya message na ho toh crash nahi karega
          const errMsg = data?.message || "Profile load karne mein error aaya";
          toast.error(errMsg);
        }
      } catch (error) {
        toast.error("Network Error: Backend se connection nahi ban paya", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ Safe Initials Logic (User aur first_name dono double check ho rahe hain)
  const initials = user && user.first_name && typeof user.first_name === "string"
    ? user.first_name.trim().split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  const menu = (
    <>
      {loading ? (
        <div className="text-center p-3">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
          Loading...
        </div>
      ) : user ? (
        <div className={styles.profileArea}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <div className={styles.userName} style={{ textTransform: "capitalize" }}>
              {user.first_name} {user.last_name || ""}
            </div>
            <div className={styles.userRole}>{user.email}</div> 
          </div>
        </div>
      ) : (
        <div className="text-center p-3 text-muted small">No profile loaded</div>
      )}

      <div className="list-group px-2">
        <Link to="/Dashboard" className={`list-group-item list-group-item-action ${styles.menuItem}`}>
          <i className="fa-solid fa-chart-line" style={{ color: "rgb(54, 131, 232)" }}></i>
          <span> Dashboard</span>
        </Link>

        <Link to="/Contacts" className={`list-group-item list-group-item-action ${styles.menuItem}`}>
          <i className="fa-solid fa-phone" style={{ color: "rgb(55, 115, 238)" }}></i>
          <span> Contacts</span>
        </Link>

        <Link to="/Profile" className={`list-group-item list-group-item-action ${styles.menuItem}`}>
          <i className="fa-solid fa-user" style={{ color: "rgb(55, 115, 238)" }}></i>
          <span> Profile</span>
        </Link>
        
        <button
          type="button"
          className={`list-group-item list-group-item-action ${styles.menuItem}`}
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket" style={{ color: "rgb(238, 116, 116)"}}></i>
          <span> Logout</span>
        </button>
      </div>

      <div className={styles.footerNote}>Tip: Keep your contacts updated.</div>
    </>
  );

  return (
    <>
      {/* Mobile Offcanvas Sidebar */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">{menu}</div>
      </div>

      {/* Large screen Sidebar */}
      <aside className={`${styles.sidebar} d-none d-lg-block pt-2`}>
        {menu}
      </aside>
    </>
  );
}

export default Sidebar;