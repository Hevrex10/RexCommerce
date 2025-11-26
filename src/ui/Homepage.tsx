import Hero from "../component/Hero";
import Service from "../component/Service";
import BestSelling from "../component/BestSelling";
import Browse from "../component/Browse";
import FeatureandLatest from "../component/FeatureandLatest";
import { useNavigation } from "react-router-dom";
import Loader from "../component/Loader";

export default function Homepage() {
  const navigation = useNavigation();
  const isTrue = navigation.state === "loading";
  return (
    <>
      {isTrue && <Loader />}
      <Hero />
      <Service />
      <BestSelling />
      <Browse />
      <FeatureandLatest />
    </>
  );
}
