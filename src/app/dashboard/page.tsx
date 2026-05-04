'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const salesByHour = [
  { hour: '18h', total: 420 },
  { hour: '19h', total: 680 },
  { hour: '20h', total: 840 },
  { hour: '21h', total: 1120 },
  { hour: '22h', total: 980 },
  { hour: '23h', total: 760 },
];

const categoryData = [
  { name: 'Gin', value: 34 },
  { name: 'Whisky', value: 21 },
  { name: 'Copões', value: 27 },
  { name: 'Cervejas', value: 18 },
];

const revenueTrend = [
  { day: 'Seg', total: 2100 },
  { day: 'Ter', total: 2580 },
  { day: 'Qua', total: 2390 },
  { day: 'Qui', total: 3100 },
  { day: 'Sex', total: 4280 },
  { day: 'Sáb', total: 5120 },
  { day: 'Dom', total: 3860 },
];

const topProducts = [
  { name: 'Copão Gin Morango 700ml', qty: 46 },
  { name: 'Chanceler 1L', qty: 39 },
  { name: 'Red Bull 250ml', qty: 33 },
  { name: 'Whisky Passport', qty: 24 },
];

const pieColors = ['#22c55e', '#a855f7', '#f59e0b', '#06b6d4'];

const cards = [
  { label: 'Faturamento do dia', value: 'R$ 4.980,00', hint: '+12% vs ontem' },
  { label: 'Vendas do dia', value: '87', hint: 'Ticket médio R$ 57,24' },
  { label: 'Lucro estimado', value: 'R$ 1.740,00', hint: 'Margem média 34,9%' },
  { label: 'Estoque crítico', value: '6 itens', hint: '2 produtos zerados' },
];

export default function DashboardPage() {
  return (
    <main className='p-4 md:p-8 space-y-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen'>
      <header className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-white'>Dashboard Administrativo</h1>
          <p className='text-slate-300'>Visão geral em tempo real da Adega Smart POS</p>
        </div>
        <button className='rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-slate-950 font-semibold'>Atualizar dados</button>
      </header>

      <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        {cards.map((card) => (
          <article key={card.label} className='rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/20'>
            <p className='text-sm text-slate-400'>{card.label}</p>
            <h2 className='text-2xl font-bold text-white mt-2'>{card.value}</h2>
            <p className='text-xs text-emerald-300 mt-1'>{card.hint}</p>
          </article>
        ))}
      </section>

      <section className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
        <article className='rounded-2xl border border-slate-800 bg-slate-900/80 p-4 h-[320px]'>
          <h3 className='font-semibold text-white mb-3'>Vendas por horário</h3>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={salesByHour}>
              <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
              <XAxis dataKey='hour' stroke='#94a3b8' />
              <YAxis stroke='#94a3b8' />
              <Tooltip />
              <Bar dataKey='total' fill='#22c55e' radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className='rounded-2xl border border-slate-800 bg-slate-900/80 p-4 h-[320px]'>
          <h3 className='font-semibold text-white mb-3'>Vendas por categoria</h3>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie data={categoryData} dataKey='value' nameKey='name' outerRadius={100} label>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
        <article className='rounded-2xl border border-slate-800 bg-slate-900/80 p-4 h-[320px] xl:col-span-2'>
          <h3 className='font-semibold text-white mb-3'>Evolução de faturamento (7 dias)</h3>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
              <XAxis dataKey='day' stroke='#94a3b8' />
              <YAxis stroke='#94a3b8' />
              <Tooltip />
              <Line type='monotone' dataKey='total' stroke='#a855f7' strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className='rounded-2xl border border-slate-800 bg-slate-900/80 p-4'>
          <h3 className='font-semibold text-white mb-3'>Top produtos vendidos</h3>
          <ul className='space-y-3'>
            {topProducts.map((item, index) => (
              <li key={item.name} className='flex items-center justify-between rounded-lg bg-slate-800/80 px-3 py-2'>
                <div>
                  <p className='text-sm text-white font-medium'>{index + 1}. {item.name}</p>
                  <p className='text-xs text-slate-400'>Saídas no dia</p>
                </div>
                <span className='text-emerald-300 font-bold'>{item.qty}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
