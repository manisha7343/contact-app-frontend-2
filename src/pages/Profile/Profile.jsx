import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProfileImage from "../../components/profile.jsx/ProfileImage";
import ProfileDetails from "../../components/profile.jsx/ProfileDetails";
import ProfileEditForm from "../../components/profile.jsx/ProfileEditForm";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editProfileOption, setEditProfileOption] = useState(false);
  const [uploading, setUploading] = useState(false); // 👈 Uploading ke liye alag state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // ⚠️ Check kar lena backend me Bearer space check ho raha hai ya direct token
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // 📁 NAYAA FUNCTION: Photo select hote hi backend bhejne ke liye
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Postman ki tarah form-data banaya
    const formData = new FormData();
    formData.append("profilePic", file); // 👈 KEY ka naam bilkul sahi 'profilePic'

    const token = localStorage.getItem("token");

    try {
      setUploading(true);
      toast.info("Uploading image...");

      const response = await fetch(
        "http://localhost:3001/api/user/upload-profile-pic",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // ⚠️ Dhyaan rakhna: FormData ke sath 'Content-Type' header MANUALLY MAT DAALNA, browser khud set karta hai.
          },
          body: formData, // JSON.stringify nahi karna hai, direct formData jayega
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Profile picture updated!");
        // State ke andar user ki purani photo ko naye Cloudinary URL se replace kar diya
        setUser((prevUser) => ({ ...prevUser, profilePic: data.profilePic }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="flex-grow-1 p-4 bg-white min-vh-100">
      <div className="container-fluid py-2" style={{ maxWidth: "1200px" }}>
        {/* 1.------------- PAGE LOADING/FETCHING ----------------------------- */}
        {loading && (
          <div className="text-center my-5 p-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted small">Loading your dashboard...</p>
          </div>
        )}

        {!loading && user && (
          <div className="row g-4 align-items-center mt-3">
            {/*------- LEFT SIDE: AVATAR UPLOAD SECTION---- default------------------------ */}
            <ProfileImage
              user={user}
              handleFileChange={handleFileChange}
              uploading={uploading}
            />

            {/*---------- RIGHT SIDE: DETAILS / FORM SWITCH CONTAINER ---------------------*/}
            {/*---------- RIGHT SIDE: DETAILS SECTION ---------------------*/}
            <div className="col-12 col-md-8 px-md-4">
              {/* Details hamesha screen par dikhte rahenge */}
              <ProfileDetails
                user={user}
                setEditProfileOption={setEditProfileOption}
              />

              {/* Agar editOption TRUE hoga, toh ye pop-up screen ke UPAR aa jayega */}
              {editProfileOption && (
                <ProfileEditForm
                  user={user}
                  setUser={setUser}
                  setEditProfileOption={setEditProfileOption}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
