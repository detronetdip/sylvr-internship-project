/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../context/index";
import axiosInstance from "../../utility/axios";
import { useEffect, useState } from "react";

function Auth({ children }: any) {
  const user = useRecoilValue(userState);
  const location=useLocation();
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get("http://localhost:3000/user");
      setUser((old) => {
        return {
          ...old,
          isLoggedIn: true,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
        };
      });
      if (data.data) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [location.pathname]);
  return (
    <>
      {loading ? (
        "loadinng"
      ) : user.isLoggedIn ? (
        children
      ) : (
        <Navigate to={"/auth"} />
      )}
    </>
  );
}

export default Auth;
