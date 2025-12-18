import { useState } from 'react';
import { Plus, Search, TrendingUp, Calendar, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  productos: string[];
}

interface Compra {
  id: number;
  fecha: string;
  proveedor: string;
  productos: number;
  total: number;
}

const proveedores: Proveedor[] = [
  {
    id: 1,
    nombre: 'Distribuidora Central',
    telefono: '320-111-2222',
    productos: ['Arroz', 'Aceite', 'Azúcar'],
  },
  {
    id: 2,
    nombre: 'Lácteos del Valle',
    telefono: '310-333-4444',
    productos: ['Leche', 'Yogurt', 'Queso'],
  },
  {
    id: 3,
    nombre: 'Bebidas Premium',
    telefono: '315-555-6666',
    productos: ['Coca Cola', 'Agua', 'Jugos'],
  },
];

const historialCompras: Compra[] = [
  { id: 1, fecha: '2025-12-05', proveedor: 'Distribuidora Central', productos: 15, total: 450000 },
  { id: 2, fecha: '2025-12-03', proveedor: 'Lácteos del Valle', productos: 8, total: 180000 },
  { id: 3, fecha: '2025-12-01', proveedor: 'Bebidas Premium', productos: 24, total: 320000 },
  { id: 4, fecha: '2025-11-28', proveedor: 'Distribuidora Central', productos: 12, total: 285000 },
];

const preciosPorProveedor = [
  { producto: 'Arroz Diana 1kg', proveedor1: 2300, proveedor2: 2450, proveedor3: 2280 },
  { producto: 'Aceite Gourmet 1L', proveedor1: 7800, proveedor2: 8100, proveedor3: 7650 },
  { producto: 'Leche Alpina 1L', proveedor1: 3200, proveedor2: 3000, proveedor3: 3350 },
];

export default function Compras() {
  const [modalNuevaCompra, setModalNuevaCompra] = useState(false);
  const [modalComparador, setModalComparador] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="lg:ml-64 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-blue-600 mb-1">Gestión de Compras</h1>
              <p className="text-gray-500 text-sm">{proveedores.length} proveedores activos</p>
            </div>
            <button
              onClick={() => setModalNuevaCompra(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Nueva Compra
            </button>
          </div>
        </div>
      </div>

      <div className="lg:ml-64 p-4 sm:p-6 space-y-6">
        {/* Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Compras del Mes</h3>
            <p className="text-gray-800">$1.235.000</p>
            <p className="text-green-600 text-sm mt-1">4 compras realizadas</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Proveedores Activos</h3>
            <p className="text-gray-800">{proveedores.length}</p>
            <p className="text-gray-500 text-sm mt-1">Con productos disponibles</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Última Compra</h3>
            <p className="text-gray-800">$450.000</p>
            <p className="text-gray-500 text-sm mt-1">Hace 3 días</p>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setModalComparador(true)}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-300"
          >
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-gray-800 mb-1">Comparador de Precios</h3>
            <p className="text-gray-500 text-sm">Encuentra los mejores precios</p>
          </button>
          <button className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-300">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-gray-800 mb-1">Gestionar Proveedores</h3>
            <p className="text-gray-500 text-sm">Agregar o editar proveedores</p>
          </button>
        </div>

        {/* Proveedores */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-gray-800">Proveedores</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {proveedores.map((proveedor) => (
              <div
                key={proveedor.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-800 mb-1">{proveedor.nombre}</h3>
                    <p className="text-gray-500 text-sm">{proveedor.telefono}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    Contactar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {proveedor.productos.map((producto, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {producto}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historial de compras */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-800">Historial de Compras</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Productos
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {historialCompras.map((compra) => (
                  <tr key={compra.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(compra.fecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{compra.proveedor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {compra.productos} productos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      ${compra.total.toLocaleString('es-CO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Nueva Compra */}
      <AnimatePresence>
        {modalNuevaCompra && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setModalNuevaCompra(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl bg-white rounded-lg shadow-xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-800">Registrar Nueva Compra</h2>
              </div>
              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Proveedor</label>
                    <select
                      value={proveedorSeleccionado}
                      onChange={(e) => setProveedorSeleccionado(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar proveedor</option>
                      {proveedores.map((p) => (
                        <option key={p.id} value={p.nombre}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Fecha</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-700">Productos</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Agregar producto
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Producto</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="Nombre del producto"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Cantidad</label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">
                              Precio Unitario
                            </label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total de la compra:</span>
                    <span className="text-blue-600">$0</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setModalNuevaCompra(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Compra registrada');
                    setModalNuevaCompra(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Registrar Compra
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Comparador de Precios */}
      <AnimatePresence>
        {modalComparador && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setModalComparador(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl bg-white rounded-lg shadow-xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-800">Comparador de Precios</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Compara precios entre diferentes proveedores
                </p>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">
                          Producto
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">
                          Proveedor 1
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">
                          Proveedor 2
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">
                          Proveedor 3
                        </th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">
                          Mejor Precio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {preciosPorProveedor.map((item, index) => {
                        const mejorPrecio = Math.min(
                          item.proveedor1,
                          item.proveedor2,
                          item.proveedor3
                        );
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-800">
                              {item.producto}
                            </td>
                            <td
                              className={`px-4 py-4 text-sm ${
                                item.proveedor1 === mejorPrecio
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              ${item.proveedor1.toLocaleString('es-CO')}
                            </td>
                            <td
                              className={`px-4 py-4 text-sm ${
                                item.proveedor2 === mejorPrecio
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              ${item.proveedor2.toLocaleString('es-CO')}
                            </td>
                            <td
                              className={`px-4 py-4 text-sm ${
                                item.proveedor3 === mejorPrecio
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              ${item.proveedor3.toLocaleString('es-CO')}
                            </td>
                            <td className="px-4 py-4 text-sm text-green-600">
                              ${mejorPrecio.toLocaleString('es-CO')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setModalComparador(false)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
