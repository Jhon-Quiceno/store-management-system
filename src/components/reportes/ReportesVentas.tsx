import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ventasPorDia = [
  { dia: 'Lun', ventas: 145000 },
  { dia: 'Mar', ventas: 198000 },
  { dia: 'Mié', ventas: 167000 },
  { dia: 'Jue', ventas: 223000 },
  { dia: 'Vie', ventas: 287000 },
  { dia: 'Sáb', ventas: 342000 },
  { dia: 'Dom', ventas: 189000 },
];

const productosMasVendidos = [
  { nombre: 'Coca Cola 2L', cantidad: 45, color: '#3B82F6' },
  { nombre: 'Arroz Diana', cantidad: 38, color: '#10B981' },
  { nombre: 'Leche Alpina', cantidad: 32, color: '#F59E0B' },
  { nombre: 'Pan Bimbo', cantidad: 28, color: '#EF4444' },
  { nombre: 'Aceite Gourmet', cantidad: 22, color: '#8B5CF6' },
  { nombre: 'Otros', cantidad: 85, color: '#6B7280' },
];

const ingresosAcumulados = [
  { dia: 'Lun', ingresos: 145000 },
  { dia: 'Mar', ingresos: 343000 },
  { dia: 'Mié', ingresos: 510000 },
  { dia: 'Jue', ingresos: 733000 },
  { dia: 'Vie', ingresos: 1020000 },
  { dia: 'Sáb', ingresos: 1362000 },
  { dia: 'Dom', ingresos: 1551000 },
];

export default function ReportesVentas() {
  const [fechaDesde, setFechaDesde] = useState('2025-12-01');
  const [fechaHasta, setFechaHasta] = useState('2025-12-08');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="lg:ml-64 p-4 sm:p-6">
          <h1 className="text-blue-600 mb-1">Reportes de Ventas</h1>
          <p className="text-gray-500 text-sm">Últimos 7 días</p>
        </div>
      </div>

      <div className="lg:ml-64 p-4 sm:p-6 space-y-6">
        {/* Panel de filtros */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="text-gray-800">Filtros de Búsqueda</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Desde</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Hasta</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Resumen de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Ventas Totales</h3>
            <p className="text-gray-800">$1.551.000</p>
            <p className="text-green-600 text-sm mt-1">+15% vs semana anterior</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Promedio Diario</h3>
            <p className="text-gray-800">$221.571</p>
            <p className="text-gray-500 text-sm mt-1">Basado en 7 días</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Productos Vendidos</h3>
            <p className="text-gray-800">250 unidades</p>
            <p className="text-blue-600 text-sm mt-1">35 transacciones</p>
          </div>
        </div>

        {/* Gráfico de barras - Ventas por día */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-gray-800 mb-4">Ventas por Día</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="dia" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString('es-CO')}`}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="ventas" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráficos lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de dona - Productos más vendidos */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-gray-800 mb-4">Productos Más Vendidos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productosMasVendidos}
                  dataKey="cantidad"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  label={(entry) => entry.nombre}
                >
                  {productosMasVendidos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de línea - Ingresos acumulados */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-gray-800 mb-4">Ingresos Acumulados</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ingresosAcumulados}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="dia" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString('es-CO')}`}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de resumen */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-800">Detalle de Ventas Diarias</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Día
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Ventas
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Transacciones
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Ticket Promedio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ventasPorDia.map((venta, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {venta.dia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      ${venta.ventas.toLocaleString('es-CO')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {5 + index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ${Math.round(venta.ventas / (5 + index)).toLocaleString('es-CO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
