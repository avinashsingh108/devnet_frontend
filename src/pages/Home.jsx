import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
