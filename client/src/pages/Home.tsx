/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../context";

function Home() {
  const location = useNavigate();
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  
  return (
    <>
      <div className="home-container">
        <div className="container">
          <h1>Dashboard</h1>
          <h2>Welcome, {`${user.firstName} ${user.lastName}`}</h2>
          <h3>{user.email}</h3>
          <div className="btn-row">
            <button onClick={() => location("/update")}>Update profile</button>
            <button
              onClick={() => {
                localStorage.clear();
                setUser((old) => {
                  return {
                    ...old,
                    isLoggedIn: false,
                  };
                });
                location("/auth");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
