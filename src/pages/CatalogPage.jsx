import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CatalogService } from '../data/CatalogService';
import './CatalogPage.css';

const CatalogPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch ALL categories to resolve the ID from the name in URL
                const cats = await CatalogService.getCategories();
                const currentCat = cats.find(c => c.name.toLowerCase() === category.toLowerCase());

                if (currentCat) {
                    console.log(`CatalogPage: Resolved category name "${category}" to ID: ${currentCat.id}`);
                    setCategoryName(currentCat.name);
                    // 2. Fetch products using the real UUID
                    const prodData = await CatalogService.getProductsByCategory(currentCat.id);
                    setProducts(prodData);
                } else {
                    console.warn(`CatalogPage: Could not resolve category name "${category}" from fetched categories.`);
                    // Fallback or handle not found
                    setCategoryName(category.charAt(0).toUpperCase() + category.slice(1));
                    setProducts([]);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    return (
        <div className="catalog-page">
            <div className="container">
                <header className="catalog-header">
                    <Link to="/" className="btn-back">← Volver al Inicio</Link>
                    <h1>{categoryName}</h1>
                    <p>Explora nuestra selección de {categoryName.toLowerCase()} diseñados para inspirarte.</p>
                </header>

                {loading ? (
                    <div className="loading-state">
                        <p>Cargando productos mágicos...</p>
                    </div>
                ) : products.length > 0 ? (
                    <div className="product-grid">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <p>Lo sentimos, no encontramos productos en esta categoría.</p>
                        <Link to="/" className="btn-primary">Ver otras categorías</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
