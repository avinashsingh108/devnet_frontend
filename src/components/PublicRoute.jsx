import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";

const PublicRoute = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (user) {
          navigate("/feed", { replace: true });
        } else {
          const response = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
          });

          if (response.data) {
            navigate("/feed", { replace: true });
          }
        }
      } catch (error) {
        //console.error(error);
      }
    };

    checkAuth();
  }, [user, navigate]);

  return user ? <Navigate to="/feed" replace /> : <Outlet />;
};

export default PublicRoute;
