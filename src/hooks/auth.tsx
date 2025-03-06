/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { auth, authCheck } from "@/store/auth";
import { useEffect, useMemo, useState } from "react";

const useAuth = () => {
  const user = useRecoilValueLoadable(authCheck); 
  const setAuthState = useSetRecoilState(auth); 

  const [userData, setUserData] = useState<any | null>(null); 

  useEffect(() => {
    if (user.state === "hasValue") {
      setUserData(user.contents); 
    } else if (user.state === "hasError") {
      console.error("Failed to fetch user data:", user.contents);
    }
  }, [user]);

  const authState = useMemo(() => {
    // console.log(userData);
    return {
      isAuthenticated: () =>
        !!userData?.accessToken ,
    };
  }, [userData]);

  const logout = () => {
    setAuthState(null); 
    setUserData(null); 
  };

  return { userData, authState, logout };
};

export default useAuth;
