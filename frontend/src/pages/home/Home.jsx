import Blogs from "../blogs/Blogs";
import Trendingproducts from "../shop/Trendingproducts";
import Banner from "./Banner";
import Categories from "./Categories";
import DealsSection from "./DealsSection";
import HeroSection from "./HeroSection";
import PromoBanner from "./PromoBanner";
const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <HeroSection />
      <Trendingproducts />
      <DealsSection />
      <PromoBanner />
      <Blogs />
    </>
  );
};

export default Home;
