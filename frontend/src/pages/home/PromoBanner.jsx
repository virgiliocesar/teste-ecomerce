

const PromoBanner = () => {
  return (
      <section className="section__container banner__container">
          <div className="banner__card">
              <span><i className="ri-truck-line"></i></span>
              <h4>Entrega Grátis</h4>
              <p>Oferece conveniência e a possibilidade de comprar de qualquer lugar, a qualquer hora.</p>
          </div>
          <div className="banner__card">
              <span><i className="ri-money-dollar-circle-line"></i></span>
              <h4>Devolução garantida.</h4>
              <p>E-commerce tem um sistema de avaliações onde os clientes podem compartilhar feedbacks.</p>
          </div>
          <div className="banner__card">
              <span><i className="ri-user-voice-fill"></i></span>
              <h4>Suporte forte e eficiente.</h4>
              <p>Serviço de suporte ao cliente para ajudar os clientes com consultas e problemas.</p>
          </div>
    </section>
  )
}

export default PromoBanner