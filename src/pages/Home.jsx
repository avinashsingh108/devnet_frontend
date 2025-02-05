import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";
import { toast } from "sonner";

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserData = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      if (error.response?.status === 401) {
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
          navigate("/login");
        }
      } else if (!error.response) {
        toast.error("Network error: Please check your internet connection.");
      } else {
        toast.error("Something went wrong.");
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, [userData, navigate, location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
