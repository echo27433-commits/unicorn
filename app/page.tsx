import CaseStudy from "./components/CaseStudy";
import CustomerResults from "./components/CustomerResults";
import Header from "./components/Header";
import OurLocation from "./components/OurLocation";

export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <CustomerResults />
      <CaseStudy />
      <OurLocation />
    </div>
  );
}
