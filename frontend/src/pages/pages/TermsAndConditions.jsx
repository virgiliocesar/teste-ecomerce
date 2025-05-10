import React from 'react';

const TermsAndConditions = () => {
    return (
        <section className="section__container bg-white py-16 shadow-xl">
            <div className="max-w-4xl mx-auto px-4">
                <p className="text-lg text-gray-700 mb-6">
                    Leia atentamente nossos termos e condições para garantir uma experiência segura e sem problemas.
                </p>
                <div className="text-lg text-gray-700">
                    <ul className="list-disc pl-5">
                        <li>Termo 1 - Detalhes sobre as políticas de entrega.</li>
                        <li>Termo 2 - Política de devolução e reembolso.</li>
                        <li>Termo 3 - Responsabilidade dos usuários ao utilizar o site.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;
