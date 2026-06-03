import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    //1. token nhi hai fake do login pe
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    //2. function to fetch profile form backend
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        //data = response
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

    fetchProfile();
  }, [navigate]);

  return (
    <main className="flex-grow-1 p-4">
      <h1>Profile</h1>
      {loading && <p>Loading...</p>}

      {!loading && user && (
        <div className="card">
          <div className="card-body">
            <ul>
              <li>{user.first_name}</li>
              <li>{user.last_name}</li>
              <li>{user.email}</li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
