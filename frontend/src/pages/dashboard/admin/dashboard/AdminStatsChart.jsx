import { Pie, Line } from 'react-chartjs-2'
import 'chart.js/auto'

const AdminStatsChart = ({ stats }) => {
    const pieData = {
        labels: ["Pedidos", "Produtos", "Avaliações", "Usuários"],
        datasets: [
            {
                data: [
                    stats?.totalOrders,
                    stats?.totalProducts,
                    stats?.totalReviews,
                    stats?.totalUsers,
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                hoverOffset: 10,
            },
        ],
    }

    const data = new Array(12).fill(0)
    stats?.monthlyEarnings.forEach((entry) => {
        data[entry.month - 1] = entry.earnings
    })

    const lineData = {
        labels: [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez",
        ],
        datasets: [
            {
                label: "Ganhos Mensais (R$)",
                data,
                fill: true,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "#36A2EB",
                tension: 0.3,
                pointBackgroundColor: "#36A2EB",
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    }
                }
            },
        },
        scales: {
            y: {
                ticks: {
                    color: '#666'
                },
                grid: {
                    color: '#eee'
                }
            },
            x: {
                ticks: {
                    color: '#666'
                },
                grid: {
                    color: '#eee'
                }
            }
        }
    }

    return (
        <div className='mt-12'>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>📊 Estatísticas do Administrador</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Pie chart */}
                <div className='bg-white rounded-2xl shadow-lg p-6 h-96'>
                    <h3 className='text-lg font-semibold mb-4 text-center text-gray-700'>Resumo Geral</h3>
                    <Pie data={pieData} options={options} />
                </div>

                {/* Line chart */}
                <div className='bg-white rounded-2xl shadow-lg p-6 h-96'>
                    <h3 className='text-lg font-semibold mb-4 text-center text-gray-700'>Ganhos Mensais</h3>
                    <Line data={lineData} options={options} />
                </div>
            </div>

            <p className='text-center text-sm text-gray-500 mt-8'>Feito com ❤️ por <span className='font-semibold text-gray-700'>Virgílio</span></p>
        </div>
    )
}

export default AdminStatsChart
