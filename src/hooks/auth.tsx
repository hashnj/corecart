/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValueLoadable } from "recoil";
import { authCheck } from "@/store/auth";
import { useEffect, useMemo, useState } from "react";
// import { userState } from "@/store/user";

const useAuth = () => {
  const user = useRecoilValueLoadable(authCheck); 
  // const [authState, setAuthState] = useRecoilState(auth);
  // const [userStateValue, setUser] = useRecoilState<any>(userState); 

  const [userData, setUserData] = useState<any | null>(null); 

  useEffect(() => {
    if (user.state === "hasValue" && user.contents) {
      console.log('Fetched user:', user.contents);
      setUserData(user.contents); 
      // setUser(user.contents);
    } else if (user.state === "hasError") {
      console.error("Failed to fetch user data:", user.contents);
    }
  }, [user]);

  const isAuthenticated = useMemo(() => {
    return !!userData?.accessToken;
  }, [userData]);

  

  return { userData, isAuthenticated };
};

export default useAuth;
