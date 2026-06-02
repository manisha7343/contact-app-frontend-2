import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} userName={user?.first_name} />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <h1>Welcome, {user.first_name}!</h1>
              <div className="card mt-4">
                <div className="card-body">
                  <h5>Profile Info</h5>
                  <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              </div>
            </>
          ) : (
            <p>No user data</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
