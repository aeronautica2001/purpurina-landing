import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CatalogService } from '../data/CatalogService';
import { formatCOP } from '../utils/formatCurrency';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [activeImg, setActiveImg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await CatalogService.getProductById(id);
                if (data) {
                    setProduct(data);
                    setActiveImg(data.imagen);
                }
            } catch (error) {
                console.error("Error loading product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="pd-loading">
            <div className="pd-spinner"></div>
            <p>Preparando algo especial...</p>
        </div>
    );

    if (!product) return (
        <div className="pd-error">
            <div className="pd-container">
                <h2>No encontramos el producto</h2>
                <Link to="/" className="pd-btn-back-home">Volver al inicio</Link>
            </div>
        </div>
    );

    const whatsappLink = `https://wa.me/573229457923?text=${encodeURIComponent("Hola, quiero información sobre este producto: " + product.nombre)}`;

    return (
        <motion.main
            className="pd-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="pd-container">
                {/* Navigation */}
                <nav className="pd-breadcrumb">
                    <Link to="/">Inicio</Link> /
                    <Link to={`/catalogo/${product.categoria}`}>{product.categoria}</Link> /
                    <span>{product.nombre}</span>
                </nav>

                <div className="pd-main-grid">
                    {/* Left: Gallery */}
                    <section className="pd-gallery">
                        <div className="pd-main-view">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImg}
                                    src={activeImg}
                                    alt={product.nombre}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="pd-main-img"
                                />
                            </AnimatePresence>
                            {product.badge && (
                                <span className={`pd-badge pd-badge-${product.badge.toLowerCase()}`}>
                                    {product.badge}
                                </span>
                            )}
                        </div>
                        {product.imagenes && product.imagenes.length > 1 && (
                            <div className="pd-thumbs">
                                {product.imagenes.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`pd-thumb-btn ${activeImg === img ? 'is-active' : ''}`}
                                        onClick={() => setActiveImg(img)}
                                    >
                                        <img src={img} alt={`${product.nombre} thumbnail ${idx}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Right: Info */}
                    <section className="pd-info">
                        <header className="pd-header">
                            <span className="pd-category-tag">{product.categoria}</span>
                            <h1 className="pd-title">{product.nombre}</h1>
                            <div className="pd-price-row">
                                <span className="pd-price">{formatCOP(product.price)}</span>
                                <span className={`pd-status ${product.disponibilidad === 'Agotado' ? 'is-out' : 'is-in'}`}>
                                    {product.disponibilidad}
                                </span>
                            </div>
                        </header>

                        <div className="pd-description">
                            <p>{product.descripcion}</p>
                        </div>

                        <div className="pd-features">
                            <h3>Características principales</h3>
                            <ul className="pd-features-list">
                                {product.caracteristicas?.map((feat, i) => (
                                    <li key={i}>
                                        <svg viewBox="0 0 24 24" className="pd-feat-icon"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" /></svg>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pd-actions">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="pd-wa-btn">
                                <img src="/assets/icons/whatsapp-white.svg" alt="" className="pd-wa-icon" />
                                Comprar por WhatsApp — Respuesta rápida ⚡
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </motion.main>
    );
};

export default ProductDetailPage;
