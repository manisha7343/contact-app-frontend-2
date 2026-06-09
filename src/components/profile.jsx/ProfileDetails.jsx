const ProfileDetails = ({user, setEditProfileOption})=>{
    return (
        <>
        <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="fw-bold text-dark m-0 text-capitalize">
          {user.first_name} {user.last_name}
        </h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setEditProfileOption(true)}
        >
          <i className="fa fa-edit" />
        </button>
      </div>

      {/* ACCOUNT INFORMATION LIST */}
      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <div className="p-3 rounded-3 border bg-light">
            <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
              First Name
            </small>
            <span className="text-dark fw-semibold text-capitalize fs-5">
              {user.first_name}
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="p-3 rounded-3 border bg-light">
            <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
              Last Name
            </small>
            <span className="text-dark fw-semibold text-capitalize fs-5">
              {user.last_name}
            </span>
          </div>
        </div>

        <div className="col-12">
          <div className="p-3 rounded-3 border bg-light">
            <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
              Email Address
            </small>
            <span className="text-dark fw-semibold fs-5 text-break">
              {user.email}
            </span>
          </div>
        </div>
      </div>
        
         </>
    )
}

export default ProfileDetails;