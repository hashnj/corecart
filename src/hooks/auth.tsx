import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { authCheck } from "@/store/auth";
import { useEffect, useMemo, useState } from "react";

const useAuth = () => {
  const user = useRecoilValueLoadable(authCheck); // Loadable to handle async state
  const resetAuth = useResetRecoilState(authCheck); // Reset auth state on logout

  const [userData, setUserData] = useState<any | null>(null); // Local state to store user info

  // UseEffect to sync with Recoil state
  useEffect(() => {
    if (user.state === "hasValue") {
      setUserData(user.contents); // Store user data locally when loaded
    } else if (user.state === "hasError") {
      console.error("Failed to fetch user data:", user.contents);
    }
  }, [user]);

  const authState = useMemo(() => {
    return {
      isAuthenticated: () =>
        !!userData?.accessToken && userData.expiresAt > new Date(),
    };
  }, [userData]);

  const logout = () => {
    resetAuth(); 
    setUserData(null); 
  };

  return { userData, authState, logout };
};

export default useAuth;
