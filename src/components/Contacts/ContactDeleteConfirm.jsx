const ContactDeleteConfirm = ({ contact, onCancel, onConfirm }) => {
  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-3" style={{ backgroundColor: "#fff" }}>
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title text-dark">Confirm Delete</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body px-4 py-3">
            <p className="mb-0 text-dark">
              Are you sure you want to delete <strong>{contact?.name || "this contact"}</strong>?
            </p>
          </div>
          <div className="modal-footer border-top-0 pb-4 px-4 gap-2">
            <button type="button" className="btn btn-secondary px-4 py-2" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger px-4 py-2" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDeleteConfirm;
