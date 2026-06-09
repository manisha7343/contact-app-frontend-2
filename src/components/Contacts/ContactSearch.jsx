function ContactSearch({ searchInput, setSearchInput, onCreateContact }) {
  return (
    <>
      <div className="mx-auto d-flex col-sm-6 mb-3" role="search" style={{ gap: "6px" }}>
        <input
          className="form-control form-control-sm me-0 text-dark bg-light border-primary rounded-5"
          type="search"
          placeholder="Search contacts..."
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button 
          type="button"
          className="btn btn-primary btn-sm text-nowrap"
          onClick={onCreateContact}
        >
          <i className="fa-solid fa-plus me-1"></i>
          Add Contact
        </button>
      </div>
    </>
  );
}

export default ContactSearch;