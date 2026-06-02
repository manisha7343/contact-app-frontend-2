import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function VerifyEmail() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email] = useState(() => {
    const state = window.history.state;
    return state?.email || "";
  });

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Verify Email</h2>
              <form onSubmit={handleVerify}>
                <div className="mb-3">
                  <label className="form-label">Email: {email}</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Verification Code</label>
                  <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code from email" required />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Verifying..." : "Verify"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
