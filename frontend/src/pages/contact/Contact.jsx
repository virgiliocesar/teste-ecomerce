

const Contact = () => {
  return (
      <>
          <section className="section__container bg-primary-light">
              <h2 className="section__header capitalize">Contato <i className="ri-account-box-2-line"></i></h2>
              <p className="section__subheader"></p>
          </section>
          <section className="section__container text-gray-700 body-font relative shadow-2xl">
                  <div className="absolute inset-0 bg-gray-300">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1826.3453595599892!2d-46.52356681115651!3d-23.722736244672316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce41f19e9c2219%3A0x9f788ae2db70fa1b!2sVila%20Sao%20Pedro%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP%2C%2009784-525!5e0!3m2!1spt-BR!2sbr!4v1745432878624!5m2!1spt-BR!2sbr" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                  <div className="container px-5 py-24 mx-auto flex">
                      <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
                          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contate E-mail</h2>
                          <p className="leading-relaxed mb-5 text-gray-600"></p>
                          <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Email" type="email" />
                          <textarea className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none" placeholder="Mensagem"></textarea>
                          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer">Enviar</button>
                      <p className="text-xs text-gray-500 mt-3">Vila Sao Pedro, São Bernardo do Campo - SP.</p>
                      </div>
                  </div>
              </section>
      </>
  )
}

export default Contact