import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants";
import { addUser } from "../store/userSlice";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          const response = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
          });
          dispatch(addUser(response.data));
        }
      } catch (error) {
        //console.log(error)
      }
    };

    checkAuth();
  }, [dispatch, user]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
