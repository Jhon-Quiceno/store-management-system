import { DollarSign, ShoppingCart, TrendingDown, AlertCircle, Package } from 'lucide-react';

const notificaciones = [
  {
    id: 1,
    tipo: 'alerta',
    mensaje: 'Leche Alpina tiene stock bajo (5 unidades)',
    fecha: 'Hace 2 horas',
  },
  {
    id: 2,
    tipo: 'info',
    mensaje: 'Coca Cola 2L es el producto más vendido hoy',
    fecha: 'Hace 3 horas',
  },
  {
    id: 3,
    tipo: 'advertencia',
    mensaje: 'Cliente Juan Pérez tiene deuda vencida de $45.000',
    fecha: 'Hace 5 horas',
  },
  {
    id: 4,
    tipo: 'info',
    mensaje: 'Aceite Gourmet aumentó de precio a $8.500',
    fecha: 'Ayer',
  },
  {
    id: 5,
    tipo: 'alerta',
    mensaje: 'Pan Aliado se está agotando (3 unidades)',
    fecha: 'Ayer',
  },
];

export default function PanelPrincipal() {
  const hoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="lg:ml-64 p-4 sm:p-6">
          <h1 className="text-blue-600 mb-1">Panel Principal</h1>
          <p className="text-gray-500 text-sm capitalize">{hoy}</p>
        </div>
      </div>

      <div className="lg:ml-64 p-4 sm:p-6 space-y-6">
        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ventas del día */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Ventas del Día</h3>
            <p className="text-gray-800">$487.500</p>
            <p className="text-green-600 text-sm mt-2">+12% vs ayer</p>
          </div>

          {/* Productos vendidos */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Productos Vendidos</h3>
            <p className="text-gray-800">142 unidades</p>
            <p className="text-green-600 text-sm mt-2">+8% vs ayer</p>
          </div>

          {/* Última venta */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Última Venta</h3>
            <p className="text-gray-800">$12.500</p>
            <p className="text-gray-500 text-sm mt-2">Hace 5 minutos</p>
          </div>

          {/* Bajo inventario */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Bajo Inventario</h3>
            <p className="text-gray-800">8 productos</p>
            <p className="text-red-600 text-sm mt-2">Requiere atención</p>
          </div>
        </div>

        {/* Sección de gráfico futuro */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-gray-800 mb-4">Resumen de Ventas</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingDown className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-gray-500">Gráfico de ventas</p>
              <p className="text-gray-400 text-sm mt-1">Próximamente disponible</p>
            </div>
          </div>
        </div>

        {/* Notificaciones importantes */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-800">Notificaciones Importantes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notificaciones.map((notif) => (
              <div
                key={notif.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`p-2 rounded-lg ${
                        notif.tipo === 'alerta'
                          ? 'bg-red-50'
                          : notif.tipo === 'advertencia'
                          ? 'bg-yellow-50'
                          : 'bg-blue-50'
                      }`}
                    >
                      <AlertCircle
                        className={`w-5 h-5 ${
                          notif.tipo === 'alerta'
                            ? 'text-red-600'
                            : notif.tipo === 'advertencia'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm mb-1">{notif.mensaje}</p>
                    <p className="text-gray-400 text-xs">{notif.fecha}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
