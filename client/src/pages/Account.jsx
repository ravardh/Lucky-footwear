import Container from "../components/Container";
import { RxExit } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";
import axios from "../config/api";
import { useAuth } from "../context/authContext";

const Account = () => {
  const { user, setUser } = useAuth();

  const handelLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      sessionStorage.removeItem("user");
      setUser(null);
      alert(res.data.message);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container className="space-y-6 py-8">
      <div className="bg-surface-50 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary p-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-surface-50"
            />
            <div className="text-primary-content">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-primary-content/80">{user.role}</p>
            </div>
          </div>
          <button
            className="border p-2 rounded flex justify-center items-center gap-2 font-bold text-error-content bg-error border-error hover:bg-error-content hover:text-error"
            onClick={handelLogout}
          >
            <RxExit /> Logout
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-secondary">Email</h3>
                <p className="text-base-content font-medium">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm text-secondary">Phone</h3>
                <p className="text-base-content font-medium">{user.phone}</p>
              </div>
              <div>
                <h3 className="text-sm text-secondary">Date of Birth</h3>
                <p className="text-base-content font-medium">
                  {formatDate(user.dob)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-secondary">Gender</h3>
                <p className="text-base-content font-medium">{user.gender}</p>
              </div>
              <div>
                <h3 className="text-sm text-secondary">Account Status</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-success/20 text-success"
                      : "bg-error/20 text-error"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-surface-200">
            <button className="flex items-center gap-2 text-primary/60 hover:text-primary font-medium">
              <FiEdit2 /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Account;
