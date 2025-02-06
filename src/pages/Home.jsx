import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  // const dispatch = useDispatch();
  // const userData = useSelector((store) => store.user);

  // const fetchUserData = async () => {
  //   try {
  //     const user = await axios.get(BASE_URL + "/profile/view", {
  //       withCredentials: true,
  //     });
  //     dispatch(addUser(user.data));
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!userData) {
  //     fetchUserData();
  //   }
  // }, [userData]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
