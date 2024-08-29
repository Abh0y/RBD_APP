import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, setUserRole } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userRole = localStorage.getItem("userRole");

        if (userData) {
        dispatch(setUserDetails(userData));
      }
      if (userRole) {
        dispatch(setUserRole(userRole));
      }
    }
    const token = localStorage.getItem("token");
    if (!token || token === undefined) {
      navigate("/login");
    }
  }, [dispatch, isLoggedIn, navigate]);

  return children;
};

export default AuthInitializer;
