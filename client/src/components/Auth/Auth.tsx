/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../context/index";

function Auth({ children }: any) {
  const user = useRecoilValue(userState);
  return <>{user.isLoggedIn ? children : <Navigate to={"/auth"} />}</>;
}

export default Auth;