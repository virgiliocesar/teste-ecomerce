import React from 'react';

const Tracking = () => {
    return (
        <section className="section__container bg-white py-16 shadow">
            <div className="max-w-4xl mx-auto px-4">
                <p className="text-lg text-gray-700 mb-6">
                    Insira o código de rastreamento para acompanhar seu pedido em tempo real.
                </p>
                <input
                    type="text"
                    placeholder="Código de rastreamento"
                    className="bg-gray-100 border border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg p-3 w-full mb-4"
                />
                <button className="bg-indigo-500 text-white py-2 px-6 rounded-lg cursor-pointer">
                    Rastrear
                </button>
            </div>
        </section>
    );
};

export default Tracking;
