import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { addUser } from "../store/userSlice";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          const response = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
          });
          dispatch(addUser(response.data));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [dispatch, navigate, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
