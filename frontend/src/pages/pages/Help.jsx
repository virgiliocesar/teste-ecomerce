import React from 'react';

const Help = () => {
    return (
        <section className="section__container bg-white py-16 shadow">
            <div className="max-w-4xl mx-auto px-4">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold">Como posso rastrear meu pedido?</h3>
                        <p className="text-gray-600">
                            Você pode rastrear o status do seu pedido diretamente na página "Rastreie seu pedido".
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Qual o prazo de entrega?</h3>
                        <p className="text-gray-600">
                            O prazo de entrega varia conforme a sua localização. Verifique durante o processo de compra.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Help;
