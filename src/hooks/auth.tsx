import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { authCheck } from "@/store/auth";
import { useEffect, useMemo, useState } from "react";

const useAuth = () => {
  const user = useRecoilValueLoadable(authCheck); 
  const resetAuth = useResetRecoilState(authCheck); 

  const [userData, setUserData] = useState<any | null>(null); 

  useEffect(() => {
    if (user.state === "hasValue") {
      setUserData(user.contents); 
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
