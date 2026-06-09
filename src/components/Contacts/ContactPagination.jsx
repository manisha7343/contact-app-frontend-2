const ContactPagination = ({page, setPage, totalPages}) => {
  
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const visiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  
  
  // --------------------
  if (totalPages <= 1) return null;
  
  
  
  return (
    <>
     <nav aria-label="Page navigation example" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page - 1)}
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
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default ContactPagination;