const TimelineStep = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
    // Define cores do ícone de acordo com o status e progresso
    const getStepColor = () => {
        switch (step.status) {
            case 'pendente':
                return isCurrent ? 'bg-red-700 text-red-100'
                    : isCompleted ? 'bg-red-500 text-red-100'
                        : 'bg-red-200 text-red-600';
            case 'processando':
                return isCurrent ? 'bg-yellow-600 text-yellow-100'
                    : isCompleted ? 'bg-yellow-400 text-yellow-800'
                        : 'bg-yellow-200 text-yellow-600';
            case 'enviado':
                return isCurrent ? 'bg-blue-700 text-blue-100'
                    : isCompleted ? 'bg-blue-500 text-blue-100'
                        : 'bg-blue-200 text-blue-600';
            case 'entregue':
                return isCurrent ? 'bg-green-700 text-green-100'
                    : isCompleted ? 'bg-green-500 text-green-100'
                        : 'bg-green-200 text-green-600';
            default:
                return 'bg-gray-200 text-gray-500';
        }
    };

    // Define cor da barrinha de progresso
    const getConnectorColor = () => {
        switch (step.status) {
            case 'pendente':
                return isCompleted ? 'bg-red-500' : 'bg-red-200';
            case 'processando':
                return isCompleted ? 'bg-yellow-400' : 'bg-yellow-200';
            case 'enviado':
                return isCompleted ? 'bg-blue-500' : 'bg-blue-200';
            case 'entregue':
                return isCompleted ? 'bg-green-500' : 'bg-green-200';
            default:
                return 'bg-gray-200';
        }
    };

    const iconColorClass = getStepColor();
    const connectorColor = getConnectorColor();

    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';

    return (
        <li className='relative mb-6 sm:mb-0 sm:flex-1'>
            <div className='flex items-center'>
                <div className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white shrink-0 ${iconColorClass}`}>
                    <i className={`ri-${icon.iconName} text-xl`}></i>
                </div>
                {!isLastStep && (
                    <div className={`hidden sm:flex w-full h-0.5 ${connectorColor}`}></div>
                )}
            </div>
            <div className='mt-3 sm:pe-8'>
                <h3 className={`font-medium text-base ${labelTextColor}`}>{step.label}</h3>
                <time className='block mb-2 text-sm font-normal leading-none text-gray-400'>
                    {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
                </time>
                <p className={`text-base font-normal ${descriptionTextColor}`}>{description}</p>
            </div>
        </li>
    );
};

export default TimelineStep;
