import { useNavigation } from "react-router-dom";
import AccountPage from "../Acount/AccountPage";
import Loader from "../component/Loader";
export default function MyAccount() {
    const navigation = useNavigation();
    const isTrue = navigation.state === "loading";
  return (
    <>
    {isTrue && <Loader/>}
  <AccountPage />
  </>
);
}


