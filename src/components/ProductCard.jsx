import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCOP } from '../utils/formatCurrency';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const handleImageError = (e) => {
        e.target.src = '/assets/icons/notebook.svg'; // Fallback icon
        e.target.classList.add('image-fallback');
    };

    return (
        <motion.div
            className="product-card glass"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/producto/${product.id}`} className="product-link">
                <div className="product-image">
                    <img
                        src={product.imagen || '/assets/icons/notebook.svg'}
                        alt={product.name}
                        loading="lazy"
                        onError={handleImageError}
                    />
                </div>
                <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-desc">{product.descripcion}</p>
                    <span className="product-price">{formatCOP(product.price)}</span>
                    <div className="btn-view-detail">Ver detalle</div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
