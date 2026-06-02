import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

function getProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    //1. token nhi hai fake do login pe
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const Profile = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/contacts", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (data.success) {
          setProfile(data.user.firstname);
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
    navigate("/login");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <h1>Contacts</h1>

          {loading ?   <p>Loading...</p> : "") 
            <div className="card">
              <div className="card-body">
                <ul>
                {Profile}
                  </ul>
                
                  <p>No contacts yet</p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile          ;
