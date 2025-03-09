import { atom } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { SetterOrUpdater } from "recoil";
import { toast } from "react-toastify";
import { User } from "@/types";


export const userState = atom<User|null>({
  key: "userState",
  default: null, 
});

export const updateUser = async (
  userData: Partial<User>, 
  setUser: SetterOrUpdater<User|null>
) => {
  try {
    const response = await axiosInstance.put("/user/update", userData);

    if (response.status === 200) {
      setUser(response.data.user); 
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile.");
    }
  } catch (error) {
    console.error("Update Error:", error);
    toast.error("Error updating profile.");
  }
};
