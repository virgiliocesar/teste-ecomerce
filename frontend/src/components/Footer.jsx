import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";

const Footer = () => {
    return (
        <>
        <footer className="section__container footer__container">
            <div className="footer__col">
                <h4>INFORMAÇÕES DE CONTATO</h4>
                <p>
                    <span><i className="ri-map-pin-2-fill"></i></span>
                    Vila Sao Pedro, São Bernardo do Campo - SP.
                </p>
                <p><span><i className="ri-mail-fill"></i></span>
                    suport@fashion.com
                </p>
                <p>
                    <span><i className="ri-phone-fill"></i></span>
                    (00) 0000 - 0000
                </p>
            </div>
            <div className="footer__col">
                <h4>EMPRESA</h4>
                <a href="/">Início</a>
                    <a href="/paginas/sobre">Sobre</a>
                    <a href="/paginas/trabalhe-conosco">Trabalhe Conosco</a>
                    <a href="#">Nosso blog</a>
                    <a href="/paginas/termos">Termos e Condições</a>
            </div>
            <div className="footer__col">
                    <h4>LINKS ÚTEIS</h4>
                    <a href="/paginas/ajuda">Ajuda</a>
                    <a href="/paginas/rastreio">Rastreie seu pedido</a>
                    <a href="#">Homens</a>
                    <a href="#">Mulheres</a>
                    <a href="#">Vestidos</a>
            </div>
            <div className="footer__col">
                <h4>INTAGRAM</h4>
                <div className="instagram__grid">
                    <img src={instaImg1} alt="" />
                    <img src={instaImg2} alt="" />
                    <img src={instaImg3} alt="" />
                    <img src={instaImg4} alt="" />
                    <img src={instaImg5} alt="" />
                    <img src={instaImg6} alt="" />
                </div>
            </div>
        </footer>
        <div className="footer__bar">
                <p>Copyright @2025 by Fashion. All rights reserved.</p>
        </div>
        </>
    )
}

export default Footer