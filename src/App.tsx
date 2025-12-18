import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RegistroVentas from './components/ventas/RegistroVentas';
import PanelPrincipal from './components/dashboard/PanelPrincipal';
import ReportesVentas from './components/reportes/ReportesVentas';
import Inventario from './components/inventario/Inventario';
import Fiados from './components/fiados/Fiados';
import Compras from './components/compras/Compras';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="inicio" element={<PanelPrincipal />} />
          <Route path="ventas" element={<RegistroVentas />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="fiados" element={<Fiados />} />
          <Route path="compras" element={<Compras />} />
          <Route path="reportes" element={<ReportesVentas />} />
        </Route>
      </Routes>
    </Router>
  );
}
