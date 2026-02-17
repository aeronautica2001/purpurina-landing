import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Services from './sections/Services';
import About from './sections/About';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Helper component to handle conditional layout
const AppContent = () => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');

    return (
        <div className="App">
            {!isAdminPath && <Header />}
            <Routes>
                <Route path="/" element={
                    <>
                        <Hero />
                        <Services />
                        <About />
                        <CTA />
                    </>
                } />
                <Route path="/catalogo/:category" element={<CatalogPage />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />

                {/* Rutas Administrativas */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
            {!isAdminPath && <Footer />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
