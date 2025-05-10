import dealsImg from "../../assets/deals.png"

const DealsSection = () => {
    return (
        <section className="section__container deals__container">
            <div className="deals__image">
                <img src={dealsImg} alt="" />
            </div>
            <div className="deals__content">
                <h5>Obtenha até 20% de Desconto</h5>
                <h4>Ofertas do Mês</h4>
                <p>Nossas Ofertas de Moda Feminina do Mês estão aqui para tornar seus sonhos de estilo realidade sem pesar no bolso. Descubra uma coleção curada de roupas, acessórios e calçados refinados, todos selecionados para elevar o seu guarda-roupa.</p>
                <div className="deals__countdown flex-wrap">
                    <div className="deals__countdown__card">
                        <h4>14</h4>
                        <p>Dias</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>20</h4>
                        <p>Horas</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>05</h4>
                        <p>Min</p>
                    </div>
                    <div className="deals__countdown__card">
                        <h4>05</h4>
                        <p>Seg</p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default DealsSection