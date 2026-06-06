import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Contacts.module.css"; 

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        const response = await fetch(`http://localhost:3001/api/contacts?page=${page}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        //3. reponse isstore in data variable
        const data = await response.json();

        if (data.success) {
          setContacts(data.data || []); 
          setTotalPages(data.totalPages);
          // console.log("data pages-------------------------------",data.page);
          // console.log("data-------------------------------",data);
          // console.log("totalPages ------------------------=", data.totalPages);
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
  }, [navigate, page]);

  // ==================== BOOTSTRAP PAGINATION WINDOW LOGIC ====================
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  // ===========================================================================

  return (
    <>
      {/* ------ search contact----------------- */}
      <div className="mx-auto d-flex col-sm-8" role="search">
        <input
          className="form-control me-2 text-dark bg-light border-primary rounded-5"
          type="search"
          placeholder="Search contacts..."
          aria-label="Search"
        />
        <button className="btn btn-primary" type="button">
          Search
        </button>
      </div>
      <br />

      {/* -------- contacts list ----------------------  */}
      {loading ? (
        <p>Loading...</p>
      ) : contacts.length > 0 ? (
        <ol className="list-group">
          {contacts.map((contact) => {
            // Har ek contact ka initial nikalne ke liye logic
            const contactInitial = contact.name 
              ? contact.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
              : "C";

            return (
              <li
                key={contact._id}
                className="list-group-item d-flex justify-content-between align-items-center py-3"
              >
                {/* Left side: Avatar + Info */}
                <div className="d-flex align-items-center gap-3">
                  
                  {/* Gradient Avatar Icon */}
                  <div className={styles.avatar}>
                    {contactInitial}
                  </div>

                  {/* Name and Phone */}
                  <div>
                    <div className="fw-bold mb-1">{contact.name}</div>
                    <span className="text-muted small">{contact.phone}</span>
                  </div>
                </div>

                {/* Right side: Badge Tags */}
                <span className="badge text-bg-primary rounded-pill px-2 py-1 fs-7">
                  {contact.tags}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <p>No contacts found</p>
      )}

      {/* ----- Bootstrap Pagination ----------------------- */}
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="pagination justify-content-center">

          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setpage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>

          {visiblePages.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${page === pageNumber ? "active" : ""}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => setpage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setpage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </li>

        </ul>
      </nav>
    </>
  );
}

export default Contacts;