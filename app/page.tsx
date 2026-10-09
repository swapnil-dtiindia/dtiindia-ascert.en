import Hero from "../components/Hero";
import ProductInfo from "../components/Productinfo";
import ProductDetails from "../components/ProductDetails";
import HowWorks from "../components/HowWorks";
import Benifits from "../components/Benifits";
import TrustLayer from "../components/TrustLayer";
export default function Home() {
  return (
    <div>
      <Hero />
      <ProductInfo />
      <ProductDetails />
      <TrustLayer />
      <HowWorks />
      <Benifits />
    </div>
  );
}
