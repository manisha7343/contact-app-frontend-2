import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userAPI } from "../../services/api";

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
        const { response, data } = await userAPI.getProfile();

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

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

  return (
    <main className="flex-grow-1 p-4">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <h1>Welcome, {user.first_name}!</h1>
          <div className="card mt-4">
            <div className="card-body">
              <span class="d-block p-2 text-bg-primary">
              <h3> <b> Profile Information </b></h3>
              </span>
              <br />
              <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        </>
      ) : (
        <p>No user data</p>
      )}
    </main>
  );
}

export default Dashboard;
