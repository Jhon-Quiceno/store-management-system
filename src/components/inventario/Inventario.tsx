import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, AlertTriangle, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  stockMinimo: number;
}

const productos: Producto[] = [
  { id: 1, nombre: 'Arroz Diana 500g', precio: 2500, stock: 45, categoria: 'Abarrotes', stockMinimo: 10 },
  { id: 2, nombre: 'Aceite Gourmet 1L', precio: 8500, stock: 30, categoria: 'Abarrotes', stockMinimo: 15 },
  { id: 3, nombre: 'Coca Cola 2L', precio: 5000, stock: 60, categoria: 'Bebidas', stockMinimo: 20 },
  { id: 4, nombre: 'Leche Alpina 1L', precio: 3500, stock: 5, categoria: 'Lácteos', stockMinimo: 10 },
  { id: 5, nombre: 'Pan Tajado Bimbo', precio: 4200, stock: 3, categoria: 'Panadería', stockMinimo: 5 },
  { id: 6, nombre: 'Jabón Fab 500g', precio: 3800, stock: 40, categoria: 'Limpieza', stockMinimo: 15 },
  { id: 7, nombre: 'Papas Margarita', precio: 1500, stock: 80, categoria: 'Snacks', stockMinimo: 30 },
  { id: 8, nombre: 'Azúcar Riopaila 1kg', precio: 3200, stock: 50, categoria: 'Abarrotes', stockMinimo: 20 },
  { id: 9, nombre: 'Agua Brisa 600ml', precio: 1200, stock: 100, categoria: 'Bebidas', stockMinimo: 40 },
  { id: 10, nombre: 'Yogurt Alpina', precio: 2800, stock: 8, categoria: 'Lácteos', stockMinimo: 10 },
];

export default function Inventario() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  useEffect(() => {
    setMostrarAlerta(true);
    const timer = setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const categorias = ['Todas', ...Array.from(new Set(productos.map((p) => p.categoria)))];

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === 'Todas' || producto.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  const productosStockBajo = productos.filter((p) => p.stock <= p.stockMinimo);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="lg:ml-64 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-blue-600 mb-1">Inventario</h1>
              <p className="text-gray-500 text-sm">
                {productos.length} productos registrados
              </p>
            </div>
            <button
              onClick={() => setModalAbierto(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Agregar Producto
            </button>
          </div>
        </div>
      </div>

      <div className="lg:ml-64 p-4 sm:p-6 space-y-6">
        {/* Alerta de stock bajo */}
        <AnimatePresence>
          {productosStockBajo.length > 0 && mostrarAlerta && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-red-800 mb-2">
                    {productosStockBajo.length} producto(s) con stock bajo
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {productosStockBajo.map((producto) => (
                      <span
                        key={producto.id}
                        className="bg-white text-red-700 px-3 py-1 rounded-full text-sm border border-red-200"
                      >
                        {producto.nombre} ({producto.stock})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buscador y filtros */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de productos - Vista móvil */}
        <div className="lg:hidden space-y-4">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-800 mb-1">{producto.nombre}</h3>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {producto.categoria}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Precio</p>
                  <p className="text-blue-600">${producto.precio.toLocaleString('es-CO')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stock</p>
                  <p
                    className={
                      producto.stock <= producto.stockMinimo
                        ? 'text-red-600'
                        : 'text-gray-800'
                    }
                  >
                    {producto.stock} unidades
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla de productos - Vista desktop */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productosFiltrados.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-gray-800">{producto.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {producto.categoria}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600">
                      ${producto.precio.toLocaleString('es-CO')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={
                          producto.stock <= producto.stockMinimo
                            ? 'text-red-600'
                            : 'text-gray-800'
                        }
                      >
                        {producto.stock} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {producto.stock <= producto.stockMinimo ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                          <AlertTriangle className="w-3 h-3" />
                          Stock bajo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* Modal agregar producto */}
      <AnimatePresence>
        {modalAbierto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setModalAbierto(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-white rounded-lg shadow-xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-800">Agregar Nuevo Producto</h2>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Arroz Diana 1kg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Categoría</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Abarrotes</option>
                    <option>Bebidas</option>
                    <option>Lácteos</option>
                    <option>Panadería</option>
                    <option>Limpieza</option>
                    <option>Snacks</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Precio</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Stock</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Stock Mínimo</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setModalAbierto(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Producto agregado');
                    setModalAbierto(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
