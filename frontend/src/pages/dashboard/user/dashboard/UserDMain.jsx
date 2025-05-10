import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi'
import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import UserStats from './UserStats'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDMain = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email)

    if (isLoading) return <div className='text-center text-gray-500 mt-6'>Carregando...</div>
    if (error) return <div className='text-center text-red-500 mt-6'>Erro ao carregar dados.</div>
    if (!stats) return <div className='text-center text-gray-500 mt-6'>Nenhuma estatística disponível.</div>

    const data = {
        labels: ["Pagamento Total", "Total de Avaliações", "Total de Compras"],
        datasets: [
            {
                label: "Estatísticas do Usuário",
                data: [
                    stats.totalPaymentsAmount?.toFixed(2) ?? "0.00",
                    stats.totalReviews ?? 0,
                    stats.totalPurchasedProducts ?? 0
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(153, 102, 255, 0.6)"
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1,
                borderRadius: 8,
                barThickness: 40,
            },
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false, // permite ajuste livre da altura
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`
                    }
                }
            },
            title: {
                display: true,
                text: 'Resumo de Atividades',
                color: '#333',
                font: {
                    size: 18
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#555'
                },
                grid: {
                    color: '#eee'
                }
            },
            x: {
                ticks: {
                    color: '#555'
                },
                grid: {
                    display: false
                }
            }
        }
    }

    return (
        <div className='p-4 sm:p-6 md:p-10'>
            <div className='mb-6'>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                    👤 Painel do Usuário
                </h1>
                <p className='text-gray-600 text-sm sm:text-base'>
                    Olá, <span className='font-semibold'>{user?.username}</span>! Bem-vindo ao seu painel.
                </p>
            </div>

            <div className='mb-8'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-700 mb-2'>
                    📌 Status Atual
                </h2>
                <UserStats stats={stats} />
            </div>

            <div className='bg-white p-4 sm:p-6 rounded-2xl shadow-md w-full'>
                <div className='relative h-[300px] sm:h-[400px] md:h-[500px]'>
                    <Bar data={data} options={options} />
                </div>
            </div>

            <p className='text-center text-xs sm:text-sm text-gray-400 mt-8'>
                Feito com 🛠️ por <span className='text-gray-600 font-medium'>Virgílio</span>
            </p>
        </div>
    )
}

export default UserDMain
