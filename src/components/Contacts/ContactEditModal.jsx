import { useState } from "react";
import { toast } from "react-toastify";

const ContactEditModal = ({ contact, onClose, onSave }) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: String(contact?.name || ""),
    phone: String(contact?.phone || ""),
    email: String(contact?.email || ""),
    tags: Array.isArray(contact?.tags) ? contact.tags.join(", ") : String(contact?.tags || ""),
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required.");
      return;
    }

    const normalizedName = String(form.name || "").trim();
    const normalizedPhone = String(form.phone || "").trim();
    const normalizedEmail = String(form.email || "").trim();
    const normalizedTags = String(form.tags || "");

    try {
      setSaving(true);
      const response = await fetch(`http://localhost:3001/api/contacts/${contact._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: normalizedName,
          phone: normalizedPhone,
          email: normalizedEmail,
          tags: normalizedTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();
      if (data.success || data.sucess) {
        toast.success("Contact updated successfully!");
        onSave({
          ...contact,
          name: normalizedName,
          phone: normalizedPhone,
          email: normalizedEmail,
          tags: normalizedTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        });
      } else {
        toast.error(data.message || "Unable to update contact.");
      }
    } catch (error) {
      toast.error("Update failed: " + error.message);
    } finally {
      setSaving(false);
    }
  };

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
        <div className="modal-content shadow-lg border-0 rounded-3">
          <div className="modal-header bg-light border-bottom-0 pt-4 px-4">
            <h5 className="modal-title fw-bold text-dark">Edit Contact</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={saving}
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Name</label>
              <input
                type="text"
                className="form-control text-capitalize py-2"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Phone</label>
              <input
                type="text"
                className="form-control py-2"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Email</label>
              <input
                type="email"
                className="form-control py-2"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label small fw-bold text-muted">Tags</label>
              <input
                type="text"
                className="form-control py-2"
                value={form.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                placeholder="Comma separated tags"
              />
              <small className="text-muted">Separate tags with commas.</small>
            </div>
          </div>

          <div className="modal-footer border-top-0 pb-4 px-4 gap-2">
            <button
              type="button"
              className="btn btn-secondary px-4 py-2"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success px-4 py-2"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditModal;
