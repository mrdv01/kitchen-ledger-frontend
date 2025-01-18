import Login from "../Users/Forms/Login";
import isTokenExpired from "../../utils/isTokenExpired";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user?.token;

  const isLoggedIn = !isTokenExpired(token) ? true : false;
  if (!isLoggedIn) {
    localStorage.removeItem("userInfo");
    return <Login />;
  }
  return <>{children}</>;
};

export default AuthRoute;
