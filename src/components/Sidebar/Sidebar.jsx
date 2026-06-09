import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    //1. token check kro
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    //2. function to fetch profile from backend
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          console.log("data user -----------------------",data.user);
          
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

    
  const initials = user && user.first_name
  ? user.first_name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
  : "U";

  const menu = (
    <>
      {loading ? (
        <div className="text-center p-3">Loading...</div>
      ) : user ? (
        <div className={styles.profileArea}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <div className={styles.userName}>{user.first_name} {user.last_name}</div>
            <div className={styles.userRole}>{user.email}</div> 
          </div>
        </div>
      ) : (
        <div className="text-center p-3 text-muted">No profile loaded</div>
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

      {/* Large screen Sidebar (Yahan "pt-5 mt-4" joda hai navbar ke piche na chhupne ke liye) */}
      <aside className={`${styles.sidebar} d-none d-lg-block pt-2`}>
        {menu}
      </aside>
    </>
  );
}

export default Sidebar;