/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { auth, authCheck } from "@/store/auth";
import { useEffect, useMemo, useState } from "react";
import { userState } from "@/store/user";

const useAuth = () => {
  const user = useRecoilValueLoadable(authCheck); 
  const [authState, setAuthState] = useRecoilState(auth);
  const [userStateValue, setUser] = useRecoilState<any>(userState); // Track user state

  const [userData, setUserData] = useState<any | null>(null); 

  useEffect(() => {
    if (user.state === "hasValue" && user.contents) {
      console.log('Fetched user:', user.contents);
      setUserData(user.contents); 
      setUser(user.contents);
    } else if (user.state === "hasError") {
      console.error("Failed to fetch user data:", user.contents);
    }
  }, [user]);

  const isAuthenticated = useMemo(() => {
    return !!userData?.accessToken;
  }, [userData]);

  const logout = () => {
    setAuthState(null); 
    setUser(null);  
    setUserData(null);
  };

  return { userData, isAuthenticated, logout };
};

export default useAuth;
