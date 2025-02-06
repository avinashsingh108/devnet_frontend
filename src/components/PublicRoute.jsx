import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const PublicRoute = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); 
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (user) {
            navigate("/", { replace: true });
          } else {
            const response = await axios.get(BASE_URL + "/profile/view", {
              withCredentials: true, 
            });
  
            if (response.data) {
              navigate("/", { replace: true });
            }
          }
        } catch (error) {
          //console.error(error);
        } finally {
          setIsLoading(false); 
        }
      };
  
      checkAuth();
    }, [user, navigate]);
  
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
  
    return user ? <Navigate to="/" replace /> : <Outlet />;
  };
  
export default PublicRoute;
