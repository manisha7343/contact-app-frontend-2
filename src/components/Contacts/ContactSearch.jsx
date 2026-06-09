function ContactSearch({ searchInput, setSearchInput }) {
  return (
    <>
      <div className="mx-auto d-flex col-sm-8 mb-4" role="search">
        <input
          className="form-control me-2 text-dark bg-light border-primary rounded-5"
          type="search"
          placeholder="Search contacts..."
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" >
          Search
        </button>
        </div>
    </>
  );
}

export default ContactSearch;