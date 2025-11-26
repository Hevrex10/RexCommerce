import { Outlet, useNavigation } from "react-router-dom";
import Navigation from "./component/Navigation";
import Footer from "./component/Footer";
import Loader from "./component/Loader";


export default function App() {
  const navigation = useNavigation();
  const isTrue = navigation.state === "loading";
  return (
    <>
      {isTrue && <Loader />}
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
