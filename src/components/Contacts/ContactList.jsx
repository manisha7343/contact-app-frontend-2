const ContactList = ({ loading, contacts, styles, onToggleFavorite, onDeleteContact, onEditContact }) => {

  if (loading) {
    return (
      <p className="text-center text-muted my-4"> Loading Contacts...</p>
    )
  }

  // ⚠️ FIX: false ki jagah 0 check hoga array length ke liye
  if (contacts.length === 0) {
    return (
      <p className="text-center text-muted my-4">No contacts found</p>
    )
  }

  return (
    <>
      <ol className="list-group shadow-sm mb-4">
        {contacts.map((contact) => {
          // Har ek contact ka initial nikalne ke liye logic
          const contactInitial = contact.name
            ? contact.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            : "C";

          return (
            <li
              key={contact._id}
              className="list-group-item d-flex justify-content-between align-items-center py-3"
            >
              {/* Left side: Avatar + Info */}
              <div className="d-flex align-items-center gap-3">
                {/* Gradient Avatar Icon */}
                <div className={styles.avatar}>{contactInitial}</div>

                {/* Name and Phone */}
                <div>
                  <div className="fw-bold mb-1 text-capitalize">{contact.name}</div>
                  <span className="text-muted small">
                    <i className="fa-solid fa-phone me-1 text-muted small"></i>
                    {contact.phone}
                  </span>
                </div>
              </div>

              {/* Right side: Badge Tags + Action Buttons */}
              <div className="d-flex align-items-center gap-2">
                
                {/* Tag Badge */}
                {contact.tags && contact.tags.length > 0 && (
                  <span className="badge text-bg-primary rounded-pill px-2 py-1 fs-7 me-2 text-capitalize">
                    {Array.isArray(contact.tags) ? contact.tags.join(", ") : contact.tags}
                  </span>
                )}

                {/* ⭐ Favorite Star Button */}
                <button
                  type="button"
                  className="btn btn-link p-1 text-decoration-none border-0"
                  onClick={() => onToggleFavorite(contact)}
                  title={contact.isFavorite ? "Remove Favorite" : "Mark Favorite"}
                >
                  <i
                    className={contact.isFavorite ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-muted"}
                    style={{ fontSize: "1.2rem", transition: "all 0.2s" }}
                  ></i>
                </button>

                {/* ✏️ Edit Profile/Contact Button */}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px" }}
                  onClick={() => onEditContact(contact)}
                  title="Edit Contact"
                >
                  {/* <i className="fa-solid fa-pencil" style={{ fontSize: "12px" }}></i> */}
                  <i class="fa-solid fa-user-pen" style={{color:" rgb(26, 99, 245)"},{fontSize:"12px"}}></i>
                </button>

                {/* 🗑️ Delete Button (Soft delete triggers) */}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px" }}
                  onClick={() => onDeleteContact(contact._id)}
                  title="Delete Contact"
                >
                  <i className="fa-solid fa-trash" style={{ fontSize: "12px" }}></i>
                </button>

              </div>
            </li>
          );
        })}
      </ol>
    </>
  )
}

export default ContactList;