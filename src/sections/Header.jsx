import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header glass">
            <div className="container header-container">
                <Link to="/" className="logo" aria-label="Ir al inicio">
                    <img src="/assets/logo.svg" alt="Purpurina Logo" />
                </Link>
                <nav className="nav">
                    <ul>
                        <li><Link to="/" aria-label="Ir al inicio">Inicio</Link></li>
                        <li><a href="/#services" aria-label="Ver catálogo de productos">Catálogo</a></li>
                        <li><a href="/#about" aria-label="Conocer nuestra historia">Marca</a></li>
                        <li><a href="https://wa.me/573229457923?text=Hola%20quiero%20información%20sobre%20sus%20productos" target="_blank" rel="noopener noreferrer" className="btn-small" aria-label="Contactar por WhatsApp">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
