import { useState } from "react";
import { toast } from "react-toastify";
import { userAPI } from "../../services/api";

const ProfileEditForm = ({ user, setUser, setEditProfileOption }) => {
  const [saving, setSaving] = useState(false);

  const handleSaveSubmit = async () => {
    try {
      setSaving(true);
      
      // API call
      const { response, data } = await userAPI.updateProfile({
        first_name: user.first_name,
        last_name: user.last_name,
      });

      // ✅ SAFE CHECK: data aur response.ok dono check karo taaki website crash na ho
      if (response && response.ok && data && data.success) {
        toast.success("Profile updated successfully!");
        setEditProfileOption(false);
      } else {
        toast.error(data?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div 
      className="modal d-block" 
      style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-3">
          
          {/* Header */}
          <div className="modal-header bg-light border-bottom-0 pt-4 px-4">
            <h5 className="modal-title fw-bold text-dark">Edit Profile Info</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setEditProfileOption(false)}
              disabled={saving}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body px-4 py-3">
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">First Name</label>
              <input
                type="text"
                className="form-control text-capitalize py-2"
                value={user?.first_name || ""}
                onChange={(event) =>
                  setUser({ ...user, first_name: event.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label className="form-label small fw-bold text-muted">Last Name</label>
              <input
                type="text"
                className="form-control text-capitalize py-2"
                value={user?.last_name || ""}
                onChange={(event) =>
                  setUser({ ...user, last_name: event.target.value })
                }
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top-0 pb-4 px-4 gap-2">
            <button
              type="button"
              className="btn btn-secondary px-4 py-2"
              onClick={() => setEditProfileOption(false)}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success px-4 py-2"
              onClick={handleSaveSubmit}
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

export default ProfileEditForm;