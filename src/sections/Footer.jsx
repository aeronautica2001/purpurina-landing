import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <img src="/assets/logo.svg" alt="Purpurina Logo" className="footer-logo" />
                    <p>Papelería creativa para brillar.</p>
                </div>
                <div className="footer-links">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="#hero" aria-label="Volver al inicio">Inicio</a></li>
                        <li><a href="#services" aria-label="Ir al catálogo de productos">Catálogo</a></li>
                        <li><a href="#about" aria-label="Leer sobre nuestra marca">Marca</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a
                            href="https://www.instagram.com/purpurinaypapel?igsh=MXZnc2RnZXRuZnRjdw=="
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visitar Instagram de Purpurina"
                        >
                            Instagram
                        </a>
                        <a href="#" className="social-link" aria-label="Seguir en TikTok">TikTok</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Purpurina. Hecho con ✨ por Leidy Dayana.</p>
            </div>
        </footer>
    );
};

export default Footer;
