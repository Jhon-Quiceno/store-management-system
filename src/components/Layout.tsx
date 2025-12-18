import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, ShoppingCart, Package, Users, FileText, ShoppingBag } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const menuItems = [
    { path: '/inicio', icon: Home, label: 'Inicio' },
    { path: '/inventario', icon: Package, label: 'Inventario' },
    { path: '/ventas', icon: ShoppingCart, label: 'Ventas' },
    { path: '/fiados', icon: Users, label: 'Fiados' },
    { path: '/compras', icon: ShoppingBag, label: 'Compras' },
    { path: '/reportes', icon: FileText, label: 'Reportes' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20 lg:pb-6">
        <Outlet />
      </main>

      {/* Menú inferior - Móvil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-40 shadow-lg">
        <div className="flex justify-around items-center">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-3 px-2 transition-colors flex-1 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Menú lateral - Desktop */}
      <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40">
        <div className="p-6">
          <h1 className="text-blue-600 mb-8">Sistema de Gestión</h1>
        </div>
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Espaciador para el menú lateral en desktop */}
      <div className="hidden lg:block w-64"></div>
    </div>
  );
}
