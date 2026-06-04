import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

        //if response is success then store it in the state
        if (data.success) {
          setContacts(data.data || []); 
          setTotalPages(data.totalPages);
          console.log("data pages-------------------------------",data.page);
          console.log("data-------------------------------",data);
          console.log("totalPages ------------------------=", data.totalPages);
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
      {/* type="button" lagaya hai taaki page refresh na ho */}
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

      {/* -------- contacts----------------------  */}
      {loading ? (
        <p>Loading...</p>
      ) : contacts.length > 0 ? (
        <ol className="list-group list-group-numbered">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{contact.name}</div>
                {contact.phone}
              </div>

              <span className="badge text-bg-primary align-right rounded-pill">
                {contact.tags}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p>No contacts found</p>
      )}

      {/* ----- Bootstrap Pagination ----------------------- */}
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="pagination justify-content-center">

          {/* Previous Button */}
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

          {/* Sahi numbers Bootstrap design ke sath */}
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

          {/* Next Button */}
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