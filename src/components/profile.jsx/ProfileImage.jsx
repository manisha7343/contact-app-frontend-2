const ProfileImage = ({user, handleFileChange, uploading})=>{

    if(!user) return null;

    return (
        <>
         {/* LEFT SIDE: Image UPLOAD SECTION */}
         <div className="col-12 col-md-4 text-center border-end-md pb-4 pb-md-0">
              <div className="position-relative d-inline-block">
                <div className="p-1 border border-2 rounded-circle shadow-sm bg-light">
                  <img
                    src={user.profilePic || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/*---------- photot upload icon ----------*/}
                <label
                  className="position-absolute bottom-0 end-0 bg-light text-white rounded-circle d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "35px",
                    height: "35px",
                    cursor: "pointer",
                    border: "3px solid #d3d3d3",
                  }}
                  title="Update Photo"
                >
                  <i
                    className="fa-solid fa-camera"
                    style={{ color: "rgb(26, 99, 245)" }}
                  ></i>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} // Tumhaara purana original function
                    disabled={uploading}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/*---------- STATUS MESSAGE --------------*/}
              {uploading && (
                <div className="text-primary small mt-3 fw-medium">
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></div>
                  Updating cloud image...
                </div>
              )}
            </div>
        </>
    )
}

export default ProfileImage;