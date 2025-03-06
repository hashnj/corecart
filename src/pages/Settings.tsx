import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState, updateUser, useLogout } from "../store/user";
import { FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";


const Settings = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateUser(formData, setUser);
    setIsEditing(false);
  };

  const handleLogout = useLogout();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text p-6">
      <div className="w-full max-w-md p-6 bg-backgrounds shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>

        {/* User Info Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md bg-background text-text focus:outline-none"
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
            className="w-full p-2 border rounded-md bg-background text-text focus:outline-none"
          />
        </div>

        {/* Edit & Save Buttons */}
        <div className="flex justify-between items-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaSave className="mr-2" /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
