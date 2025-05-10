import { Link } from "react-router";
import bannerImg from "../../assets/header.png";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">Até 20% de desconto </h4>
        <h1>Girl&apos;s Fashion</h1>
        <p>
          Descubra tendências e expresse seu estilo único com a moda de nossas
          mulheres site. Explore uma coleção com curadoria de roupas, acessórios
          e calçados que Atende a todos os gostos e ocasiões.
        </p>
        <button className="btn">
          <Link to="/loja">Explore agora </Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
  );
};

export default Banner;
