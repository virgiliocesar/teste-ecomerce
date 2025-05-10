import React from 'react';
import { Outlet, useLocation } from 'react-router';
const pageTitles = {
    '/paginas': 'Navegue pelas Páginas',
    '/paginas/ajuda': 'Ajuda (FAQ)',
    '/paginas/sobre': 'Sobre Nós',
    '/paginas/privacidade': 'Política de Privacidade',
    '/paginas/termos': 'Termos e Condições',
    '/paginas/rastreio': 'Rastreie seu Pedido',
    '/paginas/politica-de-entrega': 'Política de Entrega',
    '/paginas/politica-de-troca': 'Política de Troca e Devolução',
    '/paginas/trabalhe-conosco': 'Trabalhe Conosco',

};

const PagesLayout = () => {
    const location = useLocation();
    const title = pageTitles[location.pathname] || 'Página';

    return (
        <>
        <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{title}</h2>
          </section>
          <Outlet />
        </>
    );
};

export default PagesLayout;
