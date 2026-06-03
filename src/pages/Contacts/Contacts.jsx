import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //1. token check kro nhi hai toho feko login per
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    //function to fetch contacts from backend
    const getContacts = async () => {
      try {
        setLoading(true);
        //2. fetch contacts
        const response = await fetch("http://localhost:3001/api/contacts", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        //3. reponse isstore in data variable
        const data = await response.json();

        // ------------------ Logging ------------------
        // console.log("FULL DATA:", data);
        // console.log("SUCCESS:", data.success);
        // console.log("USER:", data.data);
        // ---------------------------------------------

        //if response is success then store it in the state
        if (data.success) {
          setContacts(data.data || []); //sirf data oject ko store kiya jo backend se aa raha ahi
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        // agar fetch krne k ekoi issue hai toh catch block me aao
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false); // loading band huwa state me data aa chuka hai we can use it in frontend to show
      }
    };

    getContacts();
  }, [navigate]);

  return (
    <main className="flex-grow-1 p-4">
      {/* ------ search contact----------------- */}
      <span className="mx-auto d-flex col-sm-8" role="search">
        <input
          className="form-control me-2 text-dark bg-light border-primary rounded-5"
          type="search"
          placeholder="Search contacts..."
          aria-label="Search"
        />

        <button className="btn btn-primary" type="button">
          Search
        </button>
      </span>

      {/* ----------------------- */}

      <h1>Contacts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <div className="card-body">
            {console.log("length hcontacts ", contacts)}
            {contacts.length > 0 ? (
              <ul className="list-group">
                {contacts.map((contact, index) => (
                  <li className="list-group-item" key={contact._id}>
                    {" "}
                    <span className="btn btn-primary"> {index + 1} </span>
                    <span className="btn btn-secondary">
                      {contact.name}{" "}
                    </span>
                    <span className="btn btn-warning">
                      {contact.phone}{" "}
                    </span>
                    <button className="btn btn-danger">
                      <i className="fa fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No contacts yet</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Contacts;
