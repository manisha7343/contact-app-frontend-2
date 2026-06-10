import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { authAPI } from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { response, data } = await authAPI.login(email, password);

      // Handle unauthorized explicitly (invalid credentials / token issues)
      if (response.status === 401) {
        const msg = (data && data.message) || "Invalid credentials";
        toast.error(msg);
        setLoading(false);
        return;
      }

      if (data && data.success) {
        toast.success(data.message);
        // store token only if present
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // user object may be undefined depending on backend response
        // Only set userName when provided by backend. Do NOT remove
        // existing userName here — removal should only happen on
        // explicit 401 handling in protected pages.
        if (data.user && data.user.first_name) {
          localStorage.setItem("userName", data.user.first_name);
        }

        navigate("/dashboard");
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
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPwd ? "text" : "password"}
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      <i
                        className={`fa fa-${showPwd ? "eye-slash" : "eye"}`}
                      ></i>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging..." : "Login"}
                </button>
              </form>
              <div className="mt-3 text-center">
                <p>
                  Don't have account? <Link to="/">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
