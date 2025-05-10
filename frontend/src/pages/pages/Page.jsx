import React from 'react'
import Pages from '../../data/pagesDb.json'
import { NavLink } from 'react-router';

const Page = () => {
    return (
        <>
            <section className="section__container py-16 min-h-screen shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {Pages.map((pagina, index) => (
                        <NavLink
                            key={index}
                            to={ `/paginas/${pagina.link}` }
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"

                           >
                            <h3 className="text-xl font-semibold mb-2">{pagina.titulo}</h3>
                        <p className="text-gray-600">{pagina.descricao}</p>
                        </NavLink>
                ))}
            </div>
            </section>
        </>
    );
};

export default Page
