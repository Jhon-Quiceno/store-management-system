import { useState } from 'react';
import { Search, Plus, DollarSign, AlertCircle, User, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  saldo: number;
  ultimaCompra: string;
  deudaVencida: boolean;
}

interface DetalleDeuda {
  id: number;
  fecha: string;
  descripcion: string;
  monto: number;
  tipo: 'fiado' | 'abono';
}

const clientes: Cliente[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    telefono: '300-123-4567',
    saldo: 45000,
    ultimaCompra: '2025-11-28',
    deudaVencida: true,
  },
  {
    id: 2,
    nombre: 'María González',
    telefono: '310-987-6543',
    saldo: 12500,
    ultimaCompra: '2025-12-05',
    deudaVencida: false,
  },
  {
    id: 3,
    nombre: 'Carlos Ramírez',
    telefono: '320-555-1234',
    saldo: 28000,
    ultimaCompra: '2025-12-03',
    deudaVencida: false,
  },
  {
    id: 4,
    nombre: 'Ana Martínez',
    telefono: '315-444-5678',
    saldo: 67500,
    ultimaCompra: '2025-11-25',
    deudaVencida: true,
  },
  {
    id: 5,
    nombre: 'Luis Rodríguez',
    telefono: '305-222-9876',
    saldo: 8500,
    ultimaCompra: '2025-12-06',
    deudaVencida: false,
  },
];

const historialEjemplo: DetalleDeuda[] = [
  { id: 1, fecha: '2025-12-01', descripcion: 'Compra de mercado', monto: 25000, tipo: 'fiado' },
  { id: 2, fecha: '2025-12-03', descripcion: 'Abono en efectivo', monto: -10000, tipo: 'abono' },
  { id: 3, fecha: '2025-12-05', descripcion: 'Compra de productos', monto: 15000, tipo: 'fiado' },
  { id: 4, fecha: '2025-12-06', descripcion: 'Abono en efectivo', monto: -5000, tipo: 'abono' },
];

export default function Fiados() {
  const [busqueda, setBusqueda] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [modalFiado, setModalFiado] = useState(false);
  const [modalAbono, setModalAbono] = useState(false);

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalDeudas = clientes.reduce((sum, c) => sum + c.saldo, 0);
  const deudasVencidas = clientes.filter((c) => c.deudaVencida).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="lg:ml-64 p-4 sm:p-6">
          <h1 className="text-blue-600 mb-1">Gestión de Fiados</h1>
          <p className="text-gray-500 text-sm">{clientes.length} clientes registrados</p>
        </div>
      </div>

      <div className="lg:ml-64 p-4 sm:p-6 space-y-6">
        {/* Resumen de deudas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Total en Fiados</h3>
            <p className="text-gray-800">${totalDeudas.toLocaleString('es-CO')}</p>
            <p className="text-gray-500 text-sm mt-1">{clientes.length} clientes</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Deudas Vencidas</h3>
            <p className="text-red-600">{deudasVencidas}</p>
            <p className="text-gray-500 text-sm mt-1">Requieren atención</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Promedio por Cliente</h3>
            <p className="text-gray-800">
              ${Math.round(totalDeudas / clientes.length).toLocaleString('es-CO')}
            </p>
            <p className="text-gray-500 text-sm mt-1">Saldo promedio</p>
          </div>
        </div>

        {/* Buscador */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Vista de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de clientes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800">Clientes con Fiados</h2>
              <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Nuevo Cliente
              </button>
            </div>

            <div className="space-y-3">
              {clientesFiltrados.map((cliente) => (
                <motion.div
                  key={cliente.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setClienteSeleccionado(cliente)}
                  className={`bg-white p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    clienteSeleccionado?.id === cliente.id
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-800">{cliente.nombre}</h3>
                        <p className="text-gray-500 text-sm">{cliente.telefono}</p>
                      </div>
                    </div>
                    {cliente.deudaVencida && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs">
                        <AlertCircle className="w-3 h-3" />
                        Vencida
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-gray-500 text-sm">Saldo:</span>
                    <span className="text-blue-600">
                      ${cliente.saldo.toLocaleString('es-CO')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detalle del cliente */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {clienteSeleccionado ? (
              <>
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-gray-800 mb-1">{clienteSeleccionado.nombre}</h2>
                      <p className="text-gray-500 text-sm">{clienteSeleccionado.telefono}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Saldo Total</p>
                      <p className="text-blue-600">
                        ${clienteSeleccionado.saldo.toLocaleString('es-CO')}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Última Compra</p>
                      <p className="text-gray-700 text-sm">
                        {new Date(clienteSeleccionado.ultimaCompra).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setModalFiado(true)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Nuevo Fiado
                    </button>
                    <button
                      onClick={() => setModalAbono(true)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <DollarSign className="w-4 h-4" />
                      Registrar Abono
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-gray-800 mb-4">Historial de Movimientos</h3>
                  <div className="space-y-3">
                    {historialEjemplo.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            item.tipo === 'fiado' ? 'bg-red-100' : 'bg-green-100'
                          }`}
                        >
                          {item.tipo === 'fiado' ? (
                            <Clock className="w-4 h-4 text-red-600" />
                          ) : (
                            <DollarSign className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 text-sm mb-1">{item.descripcion}</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(item.fecha).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <span
                          className={`${
                            item.tipo === 'fiado' ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {item.tipo === 'fiado' ? '+' : ''}$
                          {Math.abs(item.monto).toLocaleString('es-CO')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecciona un cliente para ver el detalle</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Nuevo Fiado */}
      <AnimatePresence>
        {modalFiado && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setModalFiado(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-white rounded-lg shadow-xl z-50"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-800">Registrar Nuevo Fiado</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Cliente: {clienteSeleccionado?.nombre}
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Descripción</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Compra de mercado"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Monto</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setModalFiado(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Fiado registrado');
                    setModalFiado(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Registrar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Registrar Abono */}
      <AnimatePresence>
        {modalAbono && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setModalAbono(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-white rounded-lg shadow-xl z-50"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-800">Registrar Abono</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Cliente: {clienteSeleccionado?.nombre}
                </p>
                <p className="text-blue-600 text-sm">
                  Saldo actual: ${clienteSeleccionado?.saldo.toLocaleString('es-CO')}
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Monto del Abono</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setModalAbono(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Abono registrado');
                    setModalAbono(false);
                  }}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Registrar Abono
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
