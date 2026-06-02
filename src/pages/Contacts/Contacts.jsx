import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const getContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/contacts", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setContacts(data.contacts || []);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getContacts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} userName={localStorage.getItem("userName")} />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <h1>Contacts</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="card">
              <div className="card-body">
                {contacts.length > 0 ? (
                  <ul>
                    {contacts.map((contact) => (
                      <li key={contact._id}>{contact.name} - {contact.phone}</li>
                    ))}
                  </ul>
                ) : (
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

export default Contacts;
