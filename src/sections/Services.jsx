import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CatalogService } from '../data/CatalogService';
import './Services.css';

const Services = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const iconMap = {
        cuadernos: '/assets/icons/notebook.svg',
        lapiceros: '/assets/icons/pen.svg',
        sticker: '/assets/icons/sticker.svg'
    };

    const colorMap = {
        cuadernos: '#87CEFA',
        lapiceros: '#FFB6D9',
        sticker: '#FF6FAE'
    };

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await CatalogService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error loading categories in Services:", error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    if (loading) return null;

    return (
        <section id="services" className="services">
            <div className="container">
                <h2 className="section-title">Nuestra Papelería</h2>
                <div className="services-grid">
                    {categories.map((item) => (
                        <Link
                            to={`/catalogo/${item.name.toLowerCase()}`}
                            key={item.id}
                            className="service-card glass"
                        >
                            <div
                                className="service-icon"
                                style={{ backgroundColor: (colorMap[item.name.toLowerCase()] || '#FFB6D9') + '22' }}
                            >
                                <img
                                    src={iconMap[item.name.toLowerCase()] || '/assets/icons/notebook.svg'}
                                    alt={item.name}
                                />
                            </div>
                            <h3>{item.name}</h3>
                            <p>Explora nuestra colección de {item.name.toLowerCase()}.</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
