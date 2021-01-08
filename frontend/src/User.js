import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function User(props) {
  const isLogged = useSelector((store) => store.authReducer.isLogged);
  const user = isLogged ? jwt_decode(localStorage.getItem("token")) : undefined;
  return user;
}

export default User;
