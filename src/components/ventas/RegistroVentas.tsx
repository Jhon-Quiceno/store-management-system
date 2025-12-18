import { useState } from 'react';
import { Search, Menu, X, ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  'Todos',
  'Abarrotes',
  'Bebidas',
  'Lácteos',
  'Panadería',
  'Limpieza',
  'Snacks',
];

const products: Product[] = [
  { id: 1, name: 'Arroz Diana 500g', price: 2500, category: 'Abarrotes', stock: 45 },
  { id: 2, name: 'Aceite Gourmet 1L', price: 8500, category: 'Abarrotes', stock: 30 },
  { id: 3, name: 'Coca Cola 2L', price: 5000, category: 'Bebidas', stock: 60 },
  { id: 4, name: 'Leche Alpina 1L', price: 3500, category: 'Lácteos', stock: 25 },
  { id: 5, name: 'Pan Tajado Bimbo', price: 4200, category: 'Panadería', stock: 15 },
  { id: 6, name: 'Jabón Fab 500g', price: 3800, category: 'Limpieza', stock: 40 },
  { id: 7, name: 'Papas Margarita', price: 1500, category: 'Snacks', stock: 80 },
  { id: 8, name: 'Azúcar Riopaila 1kg', price: 3200, category: 'Abarrotes', stock: 50 },
  { id: 9, name: 'Agua Brisa 600ml', price: 1200, category: 'Bebidas', stock: 100 },
  { id: 10, name: 'Yogurt Alpina', price: 2800, category: 'Lácteos', stock: 35 },
  { id: 11, name: 'Pan Aliado', price: 2500, category: 'Panadería', stock: 20 },
  { id: 12, name: 'Detergente Ariel', price: 12000, category: 'Limpieza', stock: 18 },
];

export default function RegistroVentas() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return { ...item, quantity: Math.max(0, Math.min(newQuantity, item.stock)) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    alert(`Venta procesada: $${total.toLocaleString('es-CO')}`);
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="lg:ml-64">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-blue-600">Registro de Ventas</h1>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:ml-64">
        <div className="flex">
          {/* Categorías - Desktop */}
          <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen p-4">
            <h2 className="text-gray-700 mb-4">Categorías</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-gray-700 mb-4">Filtros Rápidos</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Stock bajo
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Más vendidos
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Nuevos
                </button>
              </div>
            </div>
          </aside>

          {/* Panel lateral móvil */}
          <AnimatePresence>
            {menuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.aside
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: 'tween' }}
                  className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden shadow-xl overflow-y-auto"
                >
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-gray-700">Menú</h2>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-700 mb-3">Categorías</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>

                    <h3 className="text-gray-700 mt-6 mb-3">Filtros Rápidos</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                        Stock bajo
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                        Más vendidos
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                        Nuevos
                      </button>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Productos - Centro */}
          <main className="flex-1 p-4">
            {/* Buscador */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg mb-3 flex items-center justify-center">
                    <Package className="w-12 h-12 text-blue-300" />
                  </div>
                  <h3 className="text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-blue-600">${product.price.toLocaleString('es-CO')}</p>
                    <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron productos</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Botón flotante del carrito */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-30"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Panel del carrito */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-gray-800">Carrito de Compras</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">El carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="text-gray-800 flex-1">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-blue-600">
                            ${(item.price * item.quantity).toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-blue-600">${total.toLocaleString('es-CO')}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Cobrar
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}