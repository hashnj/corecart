/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState, updateUser } from "../store/user";
import { FaEdit, FaSave, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import { toast } from "react-toastify";
import { User } from "@/types";
import useAuth from "@/hooks/auth";

const Settings = () => {
  const [user, setUser] = useRecoilState<User | null>(userState); // Ensure User type is correct
  const userData = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<User>>({
    userName: "",
    email: "",
    address1: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    if (userData?.userData) {
      setFormData({
        userName: userData.userData.username || "",
        email: userData.userData.email || "",
        address1: userData.userData.address?.address1 || "",
        city: userData.userData.address?.city || "",
        state: userData.userData.address?.state || "",
        postalCode: userData.userData.address?.postalCode || "",
      });
    }
  }, [userData?.userData]); // Added optional chaining to prevent undefined errors

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(formData as User, setUser); // Ensure correct User type
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useLogout();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text p-6">
      <div className="w-full max-w-2xl p-6 bg-backgrounds shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>

        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-6xl text-gray-400" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-2 rounded-md bg-background text-text focus:outline-none focus:ring focus:ring-primary/50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-2 rounded-md bg-background text-text focus:outline-none focus:ring focus:ring-primary/50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-2 rounded-md bg-background text-text focus:outline-none focus:ring focus:ring-primary/50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-2 rounded-md bg-background text-text focus:outline-none focus:ring focus:ring-primary/50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-2 rounded-md bg-background text-text focus:outline-none focus:ring focus:ring-primary/50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-2 rounded-md bg-background text-text focus:outline-none focus:ring focus:ring-primary/50"
          />
        </div>

        <div className="flex justify-between items-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={loading}
              className={`bg-primary text-white px-4 py-2 rounded-md flex items-center transition ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/80"
              }`}
            >
              {loading ? "Saving..." : <><FaSave className="mr-2" /> Save</>}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary/80 transition"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-700 transition"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
